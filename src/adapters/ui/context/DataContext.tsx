import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Data } from '../../../core/domain/Data';
import { DataService } from '../../../core/services/DataService';
import { Participant } from '../../../core/domain/Participant';
import { Task } from '../../../core/domain/Task';

const dataService = new DataService();

type DataAction =
  | { type: 'INIT_DATA'; payload: Data }
  | { type: 'ADD_ASSESSMENT'; payload: { date: Date, participant: Participant, task: Task, option: DialogOption } }
  | { type: 'REMOVE_ASSESSMENT'; payload: { date: Date, participant: Participant, task: Task } }
  | { type: 'ADD_REWARD'; payload: { date: Date, participant: Participant, reward: string } }
  | { type: 'REMOVE_REWARD'; payload: { date: Date, participant: Participant } };

/** TODO: HERE */

interface DataContextProps {
  data: Data;
  addAssessment: ({ date, participant, task, option }: { date: Date, participant: Participant, task: Task, option: DialogOption }) => void;
  removeAssessment: ({ date, participant, task, option }: { date: Date, participant: Participant, task: Task }) => void;
  addReward: ({ date, participant, reward }: { date: Date, participant: Participant, reward: string }) => void;
  removeReward: ({ date, participant }: { date: Date, participant: Participant }) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

const dataReducer = (state: Data, action: DataAction): Data => {
  switch (action.type) {
    case 'INIT_DATA':
      dataService.init(action.payload);
      return { ...dataService.getData() };
    case 'ADD_ASSESSMENT':
      dataService.addAssessment(action.payload);
      return { ...dataService.getData() };
    case 'REMOVE_ASSESSMENT':
      dataService.removeAssessment(action.payload);
      return { ...dataService.getData() };

    case 'ADD_REWARD':
      dataService.addReward(action.payload);
      return { ...dataService.getData() };
    case 'REMOVE_REWARD':
      dataService.removeReward(action.payload);
      return { ...dataService.getData() };

    default:
      return state;
  }
};

export const DataProvider = ({ children, initialData }: { children: React.ReactNode, initialData?: Data }) => {

  const [data, dispatch] = useReducer(dataReducer, dataService.getData());

  useEffect(() => {
    dataService.init(initialData);
    dispatch({ type: "INIT_CONFIG", payload: dataService.getData() });
  }, [initialData])

  const addAssessment = (assessment: { date: Date, participant: Participant, task: Task, option: DialogOption }) => dispatch({ type: 'ADD_ASSESSMENT', payload: assessment });
  const removeAssessment = (assessment: { date: Date, participant: Participant, task: Task }) => dispatch({ type: 'REMOVE_ASSESSMENT', payload: assessment });


  const addReward = (rewardData: { date: Date, participant: Participant, reward: string }) => dispatch({ type: 'ADD_REWARD', payload: rewardData });
  const removeReward = (rewardData: { date: Date, participant: Participant }) => dispatch({ type: 'REMOVE_REWARD', payload: rewardData });




  return <DataContext.Provider value={{ data, addAssessment, removeAssessment, addReward, removeReward }}>{children}</DataContext.Provider>;
};

export const useDataContext = (): DataContextProps => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
