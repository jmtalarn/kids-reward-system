import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/Home';
import { ErrorPage } from '../pages/Error';
import { Root } from '../pages/Root';
import RewardPage from '../pages/Reward';
import RewardsPage from '../pages/Rewards';
import ParticipantsPage from '../pages/Participants';

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
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
