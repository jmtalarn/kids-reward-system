
export const LangTypes = ['en', 'es', 'ca'] as const;
export type LangType = typeof LangTypes[number]; 
