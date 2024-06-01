import React, { createContext, useContext, useReducer } from 'react';
import { Config } from '../../../core/domain/Config';
import { ConfigService } from '../../../core/services/ConfigService';
import { Participant } from '../../../core/domain/Participant';

const configService = new ConfigService();

type ConfigAction =
  | { type: 'SET_REWARD'; payload: string }
  | { type: 'ADD_PARTICIPANT'; payload: Participant }
  | { type: 'REMOVE_PARTICIPANT'; payload: string };

interface ConfigContextProps {
  config: Config;
  setReward: (reward: string) => void;
  addParticipant: (participant: Participant) => void;
  removeParticipant: (participantId: string) => void;
}

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

const configReducer = (state: Config, action: ConfigAction): Config => {
  switch (action.type) {
    case 'SET_REWARD':
      configService.setReward(action.payload);
      return { ...configService.getConfig() };
    case 'ADD_PARTICIPANT':
      configService.addParticipant(action.payload);
      return { ...configService.getConfig() };
    case 'REMOVE_PARTICIPANT':
      configService.removeParticipant(action.payload);
      return { ...configService.getConfig() };
    default:
      return state;
  }
};

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, dispatch] = useReducer(configReducer, configService.getConfig());

  const setReward = (reward: string) => dispatch({ type: 'SET_REWARD', payload: reward });
  const addParticipant = (participant: Participant) => dispatch({ type: 'ADD_PARTICIPANT', payload: participant });
  const removeParticipant = (participantId: string) => dispatch({ type: 'REMOVE_PARTICIPANT', payload: participantId });

  return <ConfigContext.Provider value={{ config, setReward, addParticipant, removeParticipant }}>{children}</ConfigContext.Provider>;
};

export const useConfigContext = (): ConfigContextProps => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfigContext must be used within a ConfigProvider');
  }
  return context;
};
