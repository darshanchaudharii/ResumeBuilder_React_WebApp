import { useResume } from '@/context/ResumeContext';
import { ClassicTemplate } from './ClassicTemplate';
import { ModernTemplate } from './ModernTemplate';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ResumePreview() {
  const { state } = useResume();
  const { data, template } = state;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Live Preview</h2>
        <Badge variant="secondary" className="capitalize">
          {template} Template
        </Badge>
      </div>
      
      <div className="flex-1 overflow-auto p-4 bg-muted/20">
        <div 
          id="resume-preview" 
          className="max-w-[8.5in] mx-auto transform scale-75 md:scale-90 lg:scale-100 origin-top"
        >
          <Card className="overflow-hidden shadow-large">
            {template === 'classic' ? (
              <ClassicTemplate data={data} />
            ) : (
              <ModernTemplate data={data} />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}