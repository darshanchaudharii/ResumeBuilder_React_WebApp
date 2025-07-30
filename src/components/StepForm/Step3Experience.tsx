import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useResume, Experience } from '@/context/ResumeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Plus, Trash2, Briefcase } from 'lucide-react';

export function Step3Experience() {
  const { state, dispatch } = useResume();
  const [isAdding, setIsAdding] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Omit<Experience, 'id'>>();

  const watchCurrent = watch('current');

  const onSubmit = (data: Omit<Experience, 'id'>) => {
    const newExperience: Experience = {
      ...data,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_EXPERIENCE', payload: newExperience });
    reset();
    setIsAdding(false);
  };

  const removeExperience = (id: string) => {
    dispatch({ type: 'REMOVE_EXPERIENCE', payload: id });
  };

  const goToNext = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 4 });
  };

  const goToPrevious = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 2 });
  };

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
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <CardTitle>Work Experience</CardTitle>
          </div>
          <p className="text-muted-foreground">
            Add your professional work experience and achievements
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Existing Experience Items */}
          <AnimatePresence>
            {state.data.experience.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 border rounded-lg bg-muted/50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium">{exp.position}</h3>
                    <p className="text-muted-foreground">{exp.company} • {exp.location}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(exp.id)}
                    className="text-destructive hover:text-destructive ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add New Experience */}
          {!isAdding ? (
            <Button
              variant="outline"
              onClick={() => setIsAdding(true)}
              className="w-full border-dashed"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4 border rounded-lg"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position *</Label>
                    <Input
                      id="position"
                      {...register('position', { required: 'Position is required' })}
                      placeholder="Software Engineer"
                    />
                    {errors.position && (
                      <p className="text-sm text-destructive">{errors.position.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      {...register('company', { required: 'Company is required' })}
                      placeholder="Google Inc."
                    />
                    {errors.company && (
                      <p className="text-sm text-destructive">{errors.company.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      {...register('location')}
                      placeholder="San Francisco, CA"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="month"
                      {...register('startDate', { required: 'Start date is required' })}
                    />
                    {errors.startDate && (
                      <p className="text-sm text-destructive">{errors.startDate.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="month"
                      {...register('endDate')}
                      disabled={watchCurrent}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="current"
                    {...register('current')}
                  />
                  <Label htmlFor="current">Currently working here</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...register('description', { required: 'Description is required' })}
                    placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver high-quality products&#10;• Improved application performance by 30% through code optimization"
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button type="submit" variant="default">
                    Add Experience
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAdding(false);
                      reset();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={goToPrevious}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Previous
            </Button>
            <Button
              onClick={goToNext}
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              Next Step
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
