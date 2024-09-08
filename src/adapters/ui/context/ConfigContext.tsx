import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Config } from '../../../core/domain/_TOEVALUATE_/Config';
import { ConfigService } from '../../../core/services/ConfigService';
import { Participant } from '../../../core/domain/Participant';
import { Task } from '../../../core/domain/Task';

const configService = new ConfigService();

type ConfigAction =
  | { type: 'INIT_CONFIG'; payload: Config }
  | { type: 'SET_REWARD'; payload: string }
  | { type: 'ADD_PARTICIPANT'; payload: Participant }
  | { type: 'REMOVE_PARTICIPANT'; payload: string }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'REMOVE_TASK'; payload: string }
  | { type: 'REORDER_TASK'; payload: { id: string, order: number } };

interface ConfigContextProps {
  config: Config;
  setReward: (reward: string) => void;
  addParticipant: (participant: Participant) => void;
  removeParticipant: (participantId: string) => void;

  addTask: (task: Task) => void;
  removeTask: (taskId: string) => void;
  reorderTask: (taskId: string, order: number) => void;
}

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

const configReducer = (state: Config, action: ConfigAction): Config => {
  switch (action.type) {
    case 'INIT_CONFIG':
      configService.init(action.payload);
      return { ...configService.getConfig() };

    case 'SET_REWARD':
      configService.setReward(action.payload);
      return { ...configService.getConfig() };
    case 'ADD_PARTICIPANT':
      configService.addParticipant(action.payload);
      return { ...configService.getConfig() };
    case 'REMOVE_PARTICIPANT':
      configService.removeParticipant(action.payload);
      return { ...configService.getConfig() };

    case 'ADD_TASK':
      configService.addTask(action.payload);
      return { ...configService.getConfig() };
    case 'REMOVE_TASK':
      configService.removeTask(action.payload);
      return { ...configService.getConfig() };
    case 'REORDER_TASK':
      configService.reorderTask(action.payload);
      return { ...configService.getConfig() };

    default:
      return state;
  }
};

export const ConfigProvider = ({ children, initialConfig }: { children: React.ReactNode, initialConfig?: Config }) => {

  const [config, dispatch] = useReducer(configReducer, configService.getConfig());

  useEffect(() => {
    configService.init(initialConfig);
    dispatch({ type: "INIT_CONFIG", payload: configService.getConfig() });
  }, [initialConfig])

  const setReward = (reward: string) => dispatch({ type: 'SET_REWARD', payload: reward });
  const addParticipant = (participant: Participant) => dispatch({ type: 'ADD_PARTICIPANT', payload: participant });
  const removeParticipant = (participantId: string) => dispatch({ type: 'REMOVE_PARTICIPANT', payload: participantId });


  const addTask = (task: Task) => dispatch({ type: 'ADD_TASK', payload: task });
  const removeTask = (taskId: string) => dispatch({ type: 'REMOVE_TASK', payload: taskId });
  const reorderTask = (taskId: string, order: number) => dispatch({ type: 'REORDER_TASK', payload: { id: taskId, order } });



  return <ConfigContext.Provider value={{ config, setReward, addParticipant, removeParticipant, addTask, removeTask, reorderTask }}>{children}</ConfigContext.Provider>;
};

export const useConfigContext = (): ConfigContextProps => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfigContext must be used within a ConfigProvider');
  }
  return context;
};
