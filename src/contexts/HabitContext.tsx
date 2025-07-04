import React, { createContext, useContext, useState, useEffect } from 'react';
import { Habit } from '@/types/habit';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

interface Event {
  id: string;
  name: string;
  time: string;
  datetime: string;
  created_at?: string;
}

interface HabitContextType {
  habits: Habit[]
  loading: boolean
  addHabit: (habit: Omit<Habit, 'id'>) => Promise<void>
  editHabit: (id: string, updates: Partial<Omit<Habit, 'id' | 'streak' | 'highestStreak' | 'completedDates' | 'completionTimestamps'>>) => Promise<any>
  deleteHabit: (id: string) => Promise<void>
  toggleHabitCompletion: (habitId: string, date: string) => Promise<void>
  events: Event[]
  addEvent: (event: Omit<Event, 'id'>) => Promise<void>
  updateEvent: (event: Event) => Promise<void>
  deleteEvent: (id: string) => Promise<void>
  getCompletedDatesForHabit: (habitId: string) => string[]
  getCompletionTimestamp: (habitId: string, date: string) => string | undefined
  isHabitCompletedOnDate: (habitId: string, date: string) => boolean
}

export const HabitContext = createContext<HabitContextType | undefined>(undefined)

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  // Load habits from Supabase on mount
  useEffect(() => {
    const fetchHabits = async () => {
      if (!user) {
        setHabits([])
        setLoading(false)
        return
      }

      try {
        const { data: habitsData, error: habitsError } = await supabase
          .from('habits')
          .select('*')
          .eq('user_id', user.id)

        if (habitsError) throw habitsError

        const { data: completionsData, error: completionsError } = await supabase
          .from('habit_completions')
          .select('*')
          .in('habit_id', habitsData.map(h => h.id))

        if (completionsError) throw completionsError

        // Process habits with their completions
        const processedHabits = habitsData.map(habit => {
          const habitCompletions = completionsData
            .filter(c => c.habit_id === habit.id)
            .map(c => c.completion_date)

          const completionTimestamps = completionsData
            .filter(c => c.habit_id === habit.id)
            .reduce((acc, c) => ({
              ...acc,
              [c.completion_date]: c.completed_at
            }), {})

          const streak = calculateCurrentStreak(habitCompletions, habit.target_days)
          const highestStreak = calculateHighestStreak(habitCompletions, habit.target_days)

          return {
            id: habit.id,
            name: habit.name,
            targetDays: habit.target_days,
            startDate: habit.start_date,
            completedDates: habitCompletions,
            completionTimestamps,
            streak,
            highestStreak,
            created_at: habit.created_at
          }
        })

        setHabits(processedHabits)
      } catch (error) {
        console.error('Error fetching habits:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHabits()
  }, [user])

  const addHabit = async (habitData: Omit<Habit, 'id' | 'streak' | 'highestStreak' | 'completedDates' | 'completionTimestamps'>) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('habits')
        .insert({
          user_id: user.id,
          name: habitData.name,
          target_days: habitData.targetDays,
          start_date: habitData.startDate,
          streak: 0,
          highest_streak: 0
        })
        .select()
        .single()

      if (error) throw error

      const newHabit: Habit = {
        id: data.id,
        name: data.name,
        targetDays: data.target_days,
        startDate: data.start_date,
        completedDates: [],
        completionTimestamps: {},
        streak: 0,
        highestStreak: 0,
        created_at: data.created_at
      }

      setHabits(prev => [...prev, newHabit])
    } catch (error) {
      console.error('Error adding habit:', error)
      throw error
    }
  }

  const deleteHabit = async (id: string) => {
    try {
      const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', id)

      if (error) throw error

      setHabits(prev => prev.filter(habit => habit.id !== id))
    } catch (error) {
      console.error('Error deleting habit:', error)
      throw error
    }
  }

  const editHabit = async (id: string, updates: Partial<Omit<Habit, 'id' | 'streak' | 'highestStreak' | 'completedDates' | 'completionTimestamps'>>) => {
    if (!user) return;

    try {
      // First update the database
      const { data, error } = await supabase
        .from('habits')
        .update({
          name: updates.name,
          target_days: updates.targetDays,
          start_date: updates.startDate,
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select('*')
        .single();

      if (error) {
        console.error('Database update error:', error);
        throw new Error('Failed to update habit in database');
      }

      if (!data) {
        throw new Error('No data returned from update operation');
      }

      // Update local state
      setHabits(prev => 
        prev.map(habit => {
          if (habit.id !== id) return habit;
          return {
            ...habit,
            name: updates.name ?? habit.name,
            targetDays: updates.targetDays ?? habit.targetDays,
            startDate: updates.startDate ?? habit.startDate,
          }
        })
      );

      return data;
    } catch (error) {
      console.error('Error editing habit:', error);
      throw error;
    }
  };

  const toggleHabitCompletion = async (habitId: string, date: string) => {
    try {
      const habit = habits.find(h => h.id === habitId)
      if (!habit) {
        console.error('Habit not found:', habitId)
        return
      }

      const isCompleted = habit.completedDates.includes(date)
      const completionTime = new Date().toISOString()

      if (isCompleted) {
        // Remove completion
        const { error } = await supabase
          .from('habit_completions')
          .delete()
          .eq('habit_id', habitId)
          .eq('completion_date', date)

        if (error) {
          console.error('Error deleting completion:', error)
          throw error
        }
      } else {
        // Add completion with timestamp
        const { data, error } = await supabase
          .from('habit_completions')
          .insert({
            habit_id: habitId,
            completion_date: date,
            completed_at: completionTime
          })
          .select()

        if (error) {
          console.error('Error inserting completion:', error)
          // Try without completed_at
          const { error: retryError } = await supabase
            .from('habit_completions')
            .insert({
              habit_id: habitId,
              completion_date: date
            })

          if (retryError) {
            console.error('Error on retry:', retryError)
            throw retryError
          }
        }
      }

      // Update local state
      setHabits(prev => 
        prev.map(habit => {
          if (habit.id !== habitId) return habit
          
          let updatedCompletedDates: string[]
          let updatedTimestamps: Record<string, string>
          
          if (isCompleted) {
            updatedCompletedDates = habit.completedDates.filter(d => d !== date)
            const { [date]: _, ...rest } = habit.completionTimestamps
            updatedTimestamps = rest
          } else {
            updatedCompletedDates = [...habit.completedDates, date]
            updatedTimestamps = {
              ...habit.completionTimestamps,
              [date]: completionTime
            }
          }
          
          const newStreak = calculateCurrentStreak(updatedCompletedDates, habit.targetDays)
          const newHighestStreak = Math.max(habit.highestStreak, newStreak)
          
          return {
            ...habit,
            completedDates: updatedCompletedDates,
            completionTimestamps: updatedTimestamps,
            streak: newStreak,
            highestStreak: newHighestStreak,
            created_at: habit.created_at
          }
        })
      )
    } catch (error) {
      console.error('Error in toggleHabitCompletion:', error)
      throw error
    }
  }

  const getCompletedDatesForHabit = (habitId: string): string[] => {
    const habit = habits.find(h => h.id === habitId)
    return habit ? habit.completedDates : []
  }

  const getCompletionTimestamp = (habitId: string, date: string): string | undefined => {
    const habit = habits.find(h => h.id === habitId)
    return habit?.completionTimestamps[date]
  }

  const isHabitCompletedOnDate = (habitId: string, date: string): boolean => {
    const habit = habits.find(h => h.id === habitId)
    return habit ? habit.completedDates.includes(date) : false
  }

  // Load events from localStorage on mount
  useEffect(() => {
    const loadEvents = () => {
      try {
        const savedEvents = localStorage.getItem('userEvents')
        if (savedEvents) {
          const parsedEvents = JSON.parse(savedEvents) as Event[]
          setEvents(parsedEvents)
        }
      } catch (error) {
        console.error('Error loading events from localStorage:', error)
      }
    }

    loadEvents()
  }, [])

  const addEvent: (event: Omit<Event, 'id'>) => Promise<void> = async (event) => {
    try {
      const newEvent: Event = {
        ...event,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString()
      }

      setEvents(prev => {
        const updatedEvents = [...prev, newEvent]
        localStorage.setItem('userEvents', JSON.stringify(updatedEvents))
        return updatedEvents
      })
    } catch (error) {
      console.error('Error adding event:', error)
      throw error
    }
  }

  const updateEvent: (event: Event) => Promise<void> = async (event) => {
    try {
      setEvents(prev => {
        const updatedEvents = prev.map(e => e.id === event.id ? event : e)
        localStorage.setItem('userEvents', JSON.stringify(updatedEvents))
        return updatedEvents
      })
    } catch (error) {
      console.error('Error updating event:', error)
      throw error
    }
  }

  const deleteEvent: (id: string) => Promise<void> = async (id) => {
    try {
      setEvents(prev => {
        const updatedEvents = prev.filter(e => e.id !== id)
        localStorage.setItem('userEvents', JSON.stringify(updatedEvents))
        return updatedEvents
      })
    } catch (error) {
      console.error('Error deleting event:', error)
      throw error
    }
  }

  const value = {
    habits,
    loading,
    addHabit,
    editHabit,
    deleteHabit,
    toggleHabitCompletion,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getCompletedDatesForHabit,
    getCompletionTimestamp,
    isHabitCompletedOnDate
  }

  return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
}

export function useHabits() {
  const context = useContext(HabitContext)
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider')
  }
  return context
}

// Calculate the current streak up to the most recent completion
const calculateCurrentStreak = (completedDates: string[], targetDays: string[]): number => {
  if (!completedDates.length) return 0;
  // Sort dates ascending
  const sortedDates = [...completedDates].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  let streak = 0;
  let prevDate: Date | null = null;
  for (let i = 0; i < sortedDates.length; i++) {
    const date = new Date(sortedDates[i]);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    if (!targetDays.includes(dayName)) continue;
    if (prevDate) {
      // Find the next expected date (skip non-target days)
      const nextExpected = new Date(prevDate);
      do {
        nextExpected.setDate(nextExpected.getDate() + 1);
        const nextDayName = nextExpected.toLocaleDateString('en-US', { weekday: 'long' });
        if (targetDays.includes(nextDayName)) break;
      } while (true);
      if (date.getTime() !== nextExpected.getTime()) {
        streak = 1;
      } else {
        streak++;
      }
    } else {
      streak = 1;
    }
    prevDate = date;
  }
  return streak;
};

// Calculate the highest streak from all completions
const calculateHighestStreak = (completedDates: string[], targetDays: string[]): number => {
  if (!completedDates.length) return 0;
  // Sort dates ascending
  const sortedDates = [...completedDates].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  let maxStreak = 0;
  let streak = 0;
  let prevDate: Date | null = null;
  for (let i = 0; i < sortedDates.length; i++) {
    const date = new Date(sortedDates[i]);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    if (!targetDays.includes(dayName)) continue;
    if (prevDate) {
      // Find the next expected date (skip non-target days)
      const nextExpected = new Date(prevDate);
      do {
        nextExpected.setDate(nextExpected.getDate() + 1);
        const nextDayName = nextExpected.toLocaleDateString('en-US', { weekday: 'long' });
        if (targetDays.includes(nextDayName)) break;
      } while (true);
      if (date.getTime() !== nextExpected.getTime()) {
        streak = 1;
      } else {
        streak++;
      }
    } else {
      streak = 1;
    }
    if (streak > maxStreak) maxStreak = streak;
    prevDate = date;
  }
  return maxStreak;
};
