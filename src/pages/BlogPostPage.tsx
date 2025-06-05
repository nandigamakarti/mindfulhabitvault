import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPostPage: React.FC = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();

  const generateTitle = (slug: string | undefined) => {
    return slug
      ?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || 'Blog Post';
  };

  const articleTitle = generateTitle(articleSlug);

  const renderArticleContent = () => {
    if (articleSlug === 'science-of-habits') {
      return (
        <article className="prose lg:prose-xl max-w-none dark:prose-invert">
          <h2>The Science of Habit Formation: Understanding How Habits Work</h2>
          
          <p>Habits are the invisible architecture of our daily lives. They are the automated behaviors, routines, and rituals that we perform often with little conscious thought. Understanding the science behind how habits are formed is the first step towards intentionally building positive ones and breaking those that no longer serve us.</p>

          <h3>The Brain's Habit Machinery</h3>
          <p>Our brains are wired for efficiency. When we repeat an action in a specific context and it leads to a reward, the brain starts to automate the process. This automation is largely handled by a deep brain structure called the <strong>basal ganglia</strong>.</p>
          <p>Initially, performing a new action requires significant input from the prefrontal cortex, the brain's decision-making center. But as the action becomes habitual, the basal ganglia take over, freeing up mental resources. This process is a form of <strong>neuroplasticity</strong> – the brain's ability to reorganize itself by forming new neural connections.</p>
          <p>A key chemical messenger involved is <strong>dopamine</strong>. When we experience a reward associated with an action, dopamine is released, reinforcing the neural pathway for that habit. This makes us more likely to repeat the behavior in the future when the same cue appears.</p>

          <h3>The Habit Loop: Cue, Craving, Response, Reward</h3>
          <p>Popularized by Charles Duhigg in "The Power of Habit," the habit loop is a neurological pattern that governs any habit. It consists of three (or sometimes four, including craving) main components:</p>
          <ul>
            <li><strong>Cue:</strong> A trigger that tells your brain to go into automatic mode and which habit to use. This could be a location, a time of day, an emotional state, or the presence of certain people.</li>
            <li><strong>Craving (Optional but often present):</strong> The motivation or desire for the reward that the habit provides.</li>
            <li><strong>Routine/Response:</strong> The physical, mental, or emotional action you take. This is the habit itself.</li>
            <li><strong>Reward:</strong> A positive outcome that satisfies the craving and tells your brain that this particular loop is worth remembering for the future.</li>
          </ul>
          <p>Understanding this loop is crucial because to change a habit, you can intervene at any of these points, most effectively by changing the routine while keeping the cue and reward similar if possible.</p>

          <h3>Key Theories in Habit Formation</h3>
          <p>Several psychological theories have contributed to our understanding of habits:</p>
          <ul>
            <li><strong>William James:</strong> Viewed habits as tendencies resulting from repetition, automatically triggered by associated cues.</li>
            <li><strong>B.F. Skinner (Behaviorism):</strong> Emphasized the role of stimulus, behavior, and reward (reinforcement) in shaping habits.</li>
            <li><strong>Edward Tolman:</strong> Suggested that cognitive elements, like internal "maps" or expectations, play a role beyond simple stimulus-response.</li>
          </ul>

          <h3>Practical Strategies for Building Better Habits</h3>
          <p>Leveraging the science, here are some effective strategies:</p>
          <ul>
            <li><strong>Start Small:</strong> Don't try to change everything at once. Tiny habits are easier to establish and build momentum.</li>
            <li><strong>Identify Cues and Rewards:</strong> Understand what triggers your current habits (good or bad) and what rewards they provide.</li>
            <li><strong>Habit Stacking:</strong> Link a new desired habit to an existing one. For example, "After I brush my teeth (existing habit/cue), I will meditate for one minute (new habit)."</li>
            <li><strong>Make it Obvious, Attractive, Easy, and Satisfying:</strong> James Clear's "Four Laws of Behavior Change." Design your environment and routines to support your desired habits.</li>
            <li><strong>Repetition is Key:</strong> Consistency is more important than perfection. It can take anywhere from 18 to 254 days to form a new habit, depending on the person and the complexity of the habit.</li>
            <li><strong>Track Your Progress:</strong> Visualizing your streaks can be a powerful motivator.</li>
            <li><strong>Be Patient and Forgiving:</strong> Slip-ups are normal. Don't let one mistake derail your entire effort. Focus on getting back on track.</li>
          </ul>

          <h3>Conclusion</h3>
          <p>The science of habit formation reveals that habits are not just about willpower; they are deeply ingrained neurological patterns. By understanding how these patterns work, we can consciously design our habits to align with our goals, leading to significant improvements in our health, productivity, and overall wellbeing.</p>
        </article>
      );
    } else if (articleSlug === 'building-morning-routines') {
      return (
        <article className="prose lg:prose-xl max-w-none dark:prose-invert">
          <h2>Building Effective Morning Routines for a Productive Day</h2>
          <p className="lead">A well-structured morning routine can set the tone for your entire day, boosting productivity, reducing stress, and enhancing overall well-being. Discover how to build a morning ritual that works for you.</p>

          <h3>Why Are Morning Routines Important?</h3>
          <p>Starting your day with intention can have a profound impact:</p>
          <ul>
            <li><strong>Increased Productivity:</strong> By tackling important tasks early, you build momentum before distractions arise.</li>
            <li><strong>Reduced Stress:</strong> A predictable routine minimizes morning chaos and decision fatigue.</li>
            <li><strong>Improved Mental Clarity:</strong> Activities like meditation or journaling can clear your mind.</li>
            <li><strong>Better Physical Health:</strong> Incorporating exercise or a healthy breakfast supports your body.</li>
            <li><strong>Sense of Control:</strong> You start the day proactively, not reactively.</li>
          </ul>

          <h3>Core Principles of a Successful Morning Routine:</h3>
          <ul>
            <li><strong>Personalization:</strong> Tailor it to your unique needs, goals, and energy levels. What works for someone else might not work for you.</li>
            <li><strong>Consistency:</strong> Aim to follow your routine daily, even on weekends, to solidify the habit.</li>
            <li><strong>Start Small:</strong> Don't try to overhaul your mornings overnight. Add one or two small habits at a time.</li>
            <li><strong>Mindfulness:</strong> Be present in your activities rather than rushing through them.</li>
            <li><strong>Flexibility:</strong> Life happens. Allow for adjustments without abandoning the routine entirely.</li>
          </ul>

          <h3>Ideas for Your Morning Routine:</h3>
          <p>Mix and match activities that resonate with you:</p>
          <ul>
            <li><strong>Hydration:</strong> Drink a glass of water upon waking.</li>
            <li><strong>Mindfulness/Meditation:</strong> Even 5-10 minutes can make a difference.</li>
            <li><strong>Journaling:</strong> Gratitude, goal setting, or free-writing.</li>
            <li><strong>Movement:</strong> Stretching, yoga, a brisk walk, or a full workout.</li>
            <li><strong>Reading:</strong> Something inspiring or educational.</li>
            <li><strong>Learning:</strong> A short lesson in a new skill or language.</li>
            <li><strong>Healthy Breakfast:</strong> Fuel your body for the day.</li>
            <li><strong>Plan Your Day:</strong> Review your to-do list and prioritize tasks.</li>
            <li><strong>Limit Screen Time:</strong> Avoid emails and social media for the first 30-60 minutes.</li>
            <li><strong>Connect:</strong> Spend quality time with family or pets.</li>
          </ul>

          <h3>Tips for Making Your Morning Routine Stick:</h3>
          <ul>
            <li><strong>Prepare the Night Before:</strong> Lay out workout clothes, pack your lunch, or tidy your workspace.</li>
            <li><strong>Gradual Wake-Up:</strong> Avoid hitting snooze repeatedly. Consider a sunrise alarm clock.</li>
            <li><strong>Attach to Existing Habits:</strong> Link new habits to things you already do (e.g., meditate after brushing your teeth).</li>
            <li><strong>Track Your Progress:</strong> Use a habit tracker to stay motivated.</li>
            <li><strong>Be Patient:</strong> It takes time to form new habits. Don't get discouraged by occasional slip-ups.</li>
            <li><strong>Review and Adjust:</strong> Periodically assess what's working and what's not, and make changes as needed.</li>
          </ul>
          <p>Building a morning routine is an investment in yourself. By starting your day with purpose, you empower yourself to live a more focused, fulfilling, and productive life.</p>
        </article>
      );
    } else if (articleSlug === 'breaking-bad-habits') {
      return (
        <article className="prose lg:prose-xl max-w-none dark:prose-invert">
          <h2>Breaking Bad Habits: A Practical Guide to Lasting Change</h2>
          <p className="lead">We all have habits we'd like to change. Whether it's mindless scrolling, unhealthy snacking, or procrastinating, bad habits can hold us back from our goals. The good news? With understanding and the right strategies, you can break free and build a healthier, more intentional life.</p>

          <h3>Why Are Bad Habits So Hard to Break?</h3>
          <p>Habits, both good and bad, are the brain's way of automating behavior to save energy. Bad habits often stick because they trigger the brain's reward system, releasing dopamine – a feel-good chemical. This creates a powerful loop:</p>
          <ul>
            <li><strong>Cue:</strong> A trigger (e.g., stress, boredom, a specific time or place).</li>
            <li><strong>Routine:</strong> The habitual behavior itself.</li>
            <li><strong>Reward:</strong> The temporary pleasure or relief the habit provides.</li>
          </ul>
          <p>Trying to break a habit can feel like fighting your own brain, which resists change and seeks the familiar comfort of the reward, even if the habit is ultimately harmful.</p>

          <h3>Your Roadmap to Breaking Bad Habits:</h3>

          <h4>1. Understand Your "Why"</h4>
          <p>Before you start, get crystal clear on <em>why</em> you want to change this habit. Is it for your health, your relationships, your productivity, or your overall well-being? A strong, personal "why" will be your anchor when motivation wavers.</p>

          <h4>2. Identify the Habit and Its Triggers</h4>
          <p>Become a detective of your own behavior. Pinpoint the exact habit you want to break. Then, observe:</p>
          <ul>
            <li><strong>When</strong> does the urge strike?</li>
            <li><strong>Where</strong> are you?</li>
            <li><strong>Who</strong> are you with?</li>
            <li><strong>What</strong> emotions are you feeling (e.g., stressed, bored, lonely, anxious)?</li>
          </ul>
          <p>Keeping a journal for a few days can reveal patterns and triggers you might not be consciously aware of.</p>

          <h4>3. Create a Game Plan</h4>
          <ul>
            <li><strong>Set Realistic Goals:</strong> Don't aim for perfection overnight. If you want to quit sugary drinks, start by reducing your intake, not eliminating it entirely at once. Small, incremental wins build momentum.</li>
            <li><strong>Replace, Don't Just Remove:</strong> Simply trying to stop a bad habit often leaves a void. Find a healthier behavior to replace it with that provides a similar (or better) reward. If stress triggers nail-biting, try deep breathing exercises or squeezing a stress ball instead.</li>
            <li><strong>Modify Your Environment:</strong> Make your cues less visible and your new, desired behaviors more accessible. If you want to stop snacking on junk food while watching TV, remove it from the house or keep healthy snacks readily available.</li>
          </ul>

          <h4>4. Master Your Mindset</h4>
          <ul>
            <li><strong>Embrace Discomfort:</strong> Change is often uncomfortable. Acknowledge these feelings without letting them derail you. Urges are temporary; they typically peak and subside within 20 minutes if you don't act on them.</li>
            <li><strong>Practice Mindfulness:</strong> Pay attention to your thoughts and urges without judgment. This creates a space between the urge and your reaction, allowing you to make a conscious choice.</li>
            <li><strong>Visualize Success:</strong> Regularly imagine yourself successfully navigating triggers and enjoying the benefits of your new, healthier behavior.</li>
          </ul>

          <h4>5. Build a Support System</h4>
          <p>Share your goals with trusted friends, family, or a support group. Accountability and encouragement can make a huge difference. Sometimes, professional help from a therapist or counselor can provide valuable strategies, especially for deeply ingrained habits or those linked to underlying issues like anxiety or addiction.</p>

          <h4>6. Be Patient and Kind to Yourself</h4>
          <ul>
            <li><strong>Expect Setbacks:</strong> Relapses are a normal part of the process, not a sign of failure. If you slip up, don't beat yourself up. Analyze what happened, learn from it, and recommit to your goal.</li>
            <li><strong>Celebrate Progress:</strong> Acknowledge and reward your small victories (with something other than the old bad habit!). This reinforces your new behavior.</li>
            <li><strong>It Takes Time:</strong> Experts suggest it can take 10 weeks or even longer to truly break a habit and establish a new one. Be persistent.</li>
          </ul>

          <h3>Key Takeaways:</h3>
          <ul>
            <li>Breaking bad habits is a skill that can be learned.</li>
            <li>Understanding your triggers and the reward you seek is crucial.</li>
            <li>Focus on replacing bad habits with positive alternatives.</li>
            <li>Be patient, persistent, and practice self-compassion.</li>
          </ul>
          <p>By applying these strategies, you can take control of your habits and build a life aligned with your values and aspirations. Start small, stay consistent, and believe in your ability to change.</p>
        </article>
      );
    } 
    // Default fallback if no slug matches
    return (
      <article className="prose lg:prose-xl max-w-none dark:prose-invert">
        <h2>{articleTitle}</h2>
        <p>Content for this article is coming soon. Please check back later!</p>
      </article>
    );
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <header className="py-4 border-b mb-8">
        <h1 className="text-3xl font-bold text-primary">{articleTitle}</h1>
      </header>
      <main>
        {renderArticleContent()}
      </main>
    </div>
  );
};

export default BlogPostPage;
