import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResume } from '@/context/ResumeContext';
import logo from '@/assets/logo.png';

export function Navbar() {
  const { state, dispatch } = useResume();

  const toggleTheme = () => {
    dispatch({
      type: 'SET_THEME',
      payload: state.theme === 'light' ? 'dark' : 'light',
    });
  };

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="ResumeForge" 
              className="h-8 w-auto object-contain"
            />
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ResumeForge
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {state.theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            
          </div>
        </div>
      </div>
    </nav>
  );
}