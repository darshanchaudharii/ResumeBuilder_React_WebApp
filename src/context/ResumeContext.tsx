import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  summary: string;
}

export interface ResumeState {
  data: ResumeData;
  currentStep: number;
  template: 'classic' | 'modern';
  theme: 'light' | 'dark';
}

type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'REMOVE_EDUCATION'; payload: string }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<Experience> } }
  | { type: 'REMOVE_EXPERIENCE'; payload: string }
  | { type: 'UPDATE_SKILLS'; payload: string[] }
  | { type: 'UPDATE_SUMMARY'; payload: string }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_TEMPLATE'; payload: 'classic' | 'modern' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'LOAD_DATA'; payload: ResumeData };

const initialState: ResumeState = {
  data: {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
    },
    education: [],
    experience: [],
    skills: [],
    summary: '',
  },
  currentStep: 1,
  template: 'classic',
  theme: 'light',
};

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        data: {
          ...state.data,
          personalInfo: { ...state.data.personalInfo, ...action.payload },
        },
      };
    case 'ADD_EDUCATION':
      return {
        ...state,
        data: {
          ...state.data,
          education: [...state.data.education, action.payload],
        },
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        data: {
          ...state.data,
          education: state.data.education.map(edu =>
            edu.id === action.payload.id
              ? { ...edu, ...action.payload.data }
              : edu
          ),
        },
      };
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        data: {
          ...state.data,
          education: state.data.education.filter(edu => edu.id !== action.payload),
        },
      };
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        data: {
          ...state.data,
          experience: [...state.data.experience, action.payload],
        },
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        data: {
          ...state.data,
          experience: state.data.experience.map(exp =>
            exp.id === action.payload.id
              ? { ...exp, ...action.payload.data }
              : exp
          ),
        },
      };
    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        data: {
          ...state.data,
          experience: state.data.experience.filter(exp => exp.id !== action.payload),
        },
      };
    case 'UPDATE_SKILLS':
      return {
        ...state,
        data: { ...state.data, skills: action.payload },
      };
    case 'UPDATE_SUMMARY':
      return {
        ...state,
        data: { ...state.data, summary: action.payload },
      };
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_TEMPLATE':
      return { ...state, template: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'LOAD_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

interface ResumeContextType {
  state: ResumeState;
  dispatch: React.Dispatch<ResumeAction>;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  const saveToLocalStorage = () => {
    localStorage.setItem('resumeData', JSON.stringify(state.data));
    localStorage.setItem('resumeTemplate', state.template);
    localStorage.setItem('resumeTheme', state.theme);
  };

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem('resumeData');
    const savedTemplate = localStorage.getItem('resumeTemplate');
    const savedTheme = localStorage.getItem('resumeTheme');

    if (savedData) {
      dispatch({ type: 'LOAD_DATA', payload: JSON.parse(savedData) });
    }
    if (savedTemplate) {
      dispatch({ type: 'SET_TEMPLATE', payload: savedTemplate as 'classic' | 'modern' });
    }
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme as 'light' | 'dark' });
    }
  };

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveToLocalStorage();
  }, [state.data, state.template, state.theme]);

  // Load from localStorage on mount
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  return (
    <ResumeContext.Provider
      value={{ state, dispatch, saveToLocalStorage, loadFromLocalStorage }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}