import { useResume } from '@/context/ResumeContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Palette, Eye, CheckCircle } from 'lucide-react';

export function Step5Summary() {
  const { state, dispatch } = useResume();

  const goToPrevious = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 4 });
  };

  const toggleTemplate = () => {
    dispatch({
      type: 'SET_TEMPLATE',
      payload: state.template === 'classic' ? 'modern' : 'classic',
    });
  };

  const exportToPDF = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const element = document.getElementById('resume-preview');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${state.data.personalInfo.fullName || 'Resume'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const completedSections = [
    { name: 'Personal Info', completed: !!state.data.personalInfo.fullName },
    { name: 'Education', completed: state.data.education.length > 0 },
    { name: 'Experience', completed: state.data.experience.length > 0 },
    { name: 'Skills', completed: state.data.skills.length > 0 },
    { name: 'Summary', completed: !!state.data.summary },
  ];

  const completionRate = completedSections.filter(section => section.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-medium">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-step-active rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <CardTitle>Review & Export</CardTitle>
          </div>
          <p className="text-muted-foreground">
            Review your resume and export it as a PDF
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Completion Status */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {completedSections.map((section) => (
              <div
                key={section.name}
                className={`p-3 rounded-lg border text-center ${
                  section.completed
                    ? 'bg-step-completed/10 border-step-completed'
                    : 'bg-muted/50 border-muted'
                }`}
              >
                <div className="flex items-center justify-center mb-1">
                  <CheckCircle
                    className={`w-4 h-4 ${
                      section.completed ? 'text-step-completed' : 'text-muted-foreground'
                    }`}
                  />
                </div>
                <p className="text-xs font-medium">{section.name}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between p-4 bg-primary-light rounded-lg">
            <div>
              <h3 className="font-medium text-primary">
                Resume {Math.round((completionRate / 5) * 100)}% Complete
              </h3>
              <p className="text-sm text-primary/80">
                {completionRate === 5
                  ? 'Your resume is ready to export!'
                  : `Complete ${5 - completionRate} more section${
                      5 - completionRate === 1 ? '' : 's'
                    } for best results`}
              </p>
            </div>
          </div>

          {/* Template Selection */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Template Style</h3>
            </div>
            <div className="flex space-x-3">
              <Button
                variant={state.template === 'classic' ? 'default' : 'outline'}
                onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: 'classic' })}
                className="flex-1"
              >
                Classic
              </Button>
              <Button
                variant={state.template === 'modern' ? 'default' : 'outline'}
                onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: 'modern' })}
                className="flex-1"
              >
                Modern
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {state.data.education.length}
              </p>
              <p className="text-sm text-muted-foreground">Education</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {state.data.experience.length}
              </p>
              <p className="text-sm text-muted-foreground">Experience</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {state.data.skills.length}
              </p>
              <p className="text-sm text-muted-foreground">Skills</p>
            </div>
          </div>

          {/* Export Button */}
          <div className="space-y-3">
            <Button
              onClick={exportToPDF}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity text-white"
              size="lg"
            >
              <Download className="mr-2 w-5 h-5" />
              Export to PDF
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              PDF will be downloaded automatically to your device
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={goToPrevious}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => dispatch({ type: 'SET_CURRENT_STEP', payload: 1 })}
            >
              Edit Resume
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}