import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/Home';
import { ErrorPage } from '../pages/Error';
import { Root } from '../pages/Root';
import RewardPage from '../pages/Reward';
import RewardsPage from '../pages/Rewards';
import ParticipantsPage from '../pages/Participants';
import DailyTasksPage from '../pages/DailyTasks';
import WhyToUseIt from '../pages/WhyToUseIt';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Home /> },
      {
        path: '/reward/:id',
        element: <RewardPage />,
      },
      {
        path: '/rewards',
        element: <RewardsPage />,
      },
      {
        path: '/participants',
        element: <ParticipantsPage />,
      },
      {
        path: '/daily-tasks',
        element: <DailyTasksPage />,
      },
      {
        path: '/why-to-use-it',
        element: <WhyToUseIt />,
      }
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
