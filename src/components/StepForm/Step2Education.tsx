import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useResume, Education } from '@/context/ResumeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Plus, Trash2, GraduationCap } from 'lucide-react';

export function Step2Education() {
  const { state, dispatch } = useResume();
  const [isAdding, setIsAdding] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Omit<Education, 'id'>>();

  const watchCurrent = watch('current');

  const onSubmit = (data: Omit<Education, 'id'>) => {
    const newEducation: Education = {
      ...data,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_EDUCATION', payload: newEducation });
    reset();
    setIsAdding(false);
  };

  const removeEducation = (id: string) => {
    dispatch({ type: 'REMOVE_EDUCATION', payload: id });
  };

  const goToNext = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 3 });
  };

  const goToPrevious = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 1 });
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
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <CardTitle>Education</CardTitle>
          </div>
          <p className="text-muted-foreground">
            Add your academic background and qualifications
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Existing Education Items */}
          <AnimatePresence>
            {state.data.education.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 border rounded-lg bg-muted/50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{edu.degree} in {edu.field}</h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(edu.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add New Education */}
          {!isAdding ? (
            <Button
              variant="outline"
              onClick={() => setIsAdding(true)}
              className="w-full border-dashed"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Education
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
                    <Label htmlFor="institution">Institution *</Label>
                    <Input
                      id="institution"
                      {...register('institution', { required: 'Institution is required' })}
                      placeholder="University of California"
                    />
                    {errors.institution && (
                      <p className="text-sm text-destructive">{errors.institution.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree *</Label>
                    <Input
                      id="degree"
                      {...register('degree', { required: 'Degree is required' })}
                      placeholder="Bachelor of Science"
                    />
                    {errors.degree && (
                      <p className="text-sm text-destructive">{errors.degree.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="field">Field of Study *</Label>
                    <Input
                      id="field"
                      {...register('field', { required: 'Field is required' })}
                      placeholder="Computer Science"
                    />
                    {errors.field && (
                      <p className="text-sm text-destructive">{errors.field.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gpa">GPA (Optional)</Label>
                    <Input
                      id="gpa"
                      {...register('gpa')}
                      placeholder="3.8"
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
                  <Label htmlFor="current">Currently studying here</Label>
                </div>

                <div className="flex space-x-2">
                  <Button type="submit" variant="default">
                    Add Education
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
