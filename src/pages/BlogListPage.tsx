import React from 'react';

const BlogListPage: React.FC = () => {
  // Sample articles (can be fetched or passed as props in a real app)
  const articles = [
    { id: 'science-of-habits', title: 'The Science of Habit Formation' },
    { id: 'morning-routines', title: 'Building Morning Routines' },
    { id: 'breaking-bad-habits', title: 'Breaking Bad Habits' },
    { id: 'habit-stacking', title: 'Habit Stacking Guide' },
    { id: 'habit-tracking', title: 'Tracking Progress Effectively' },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <header className="py-4 border-b mb-8">
        <h1 className="text-3xl font-bold text-primary">Habit Development Resources</h1>
      </header>
      <main>
        <p className="text-lg text-muted-foreground mb-6">
          Welcome to our collection of articles focused on helping you build better habits and achieve your goals. 
          Full articles are coming soon!
        </p>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Available Topics:</h2>
          <ul className="list-disc pl-5 space-y-2">
            {articles.map(article => (
              <li key={article.id} className="text-foreground">
                {article.title} (Content coming soon)
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default BlogListPage;
