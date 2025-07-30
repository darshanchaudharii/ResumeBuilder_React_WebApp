import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useResume } from '@/context/ResumeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Plus, X, Zap, AlignLeft } from 'lucide-react';

export function Step4Skills() {
  const { state, dispatch } = useResume();
  const [newSkill, setNewSkill] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ summary: string }>({
    defaultValues: { summary: state.data.summary },
  });

  const addSkill = () => {
    if (newSkill.trim() && !state.data.skills.includes(newSkill.trim())) {
      dispatch({
        type: 'UPDATE_SKILLS',
        payload: [...state.data.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    dispatch({
      type: 'UPDATE_SKILLS',
      payload: state.data.skills.filter(skill => skill !== skillToRemove),
    });
  };

  const onSubmit = (data: { summary: string }) => {
    dispatch({ type: 'UPDATE_SUMMARY', payload: data.summary });
    dispatch({ type: 'SET_CURRENT_STEP', payload: 5 });
  };

  const goToPrevious = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 3 });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
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
              <Zap className="w-4 h-4 text-white" />
            </div>
            <CardTitle>Skills & Summary</CardTitle>
          </div>
          <p className="text-muted-foreground">
            Add your technical skills and write a professional summary
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Skills Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <Label className="text-base font-medium">Skills</Label>
              </div>
              
              <div className="flex space-x-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a skill (e.g., React, Python, Leadership)"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={addSkill}
                  variant="outline"
                  disabled={!newSkill.trim()}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border rounded-lg bg-muted/20">
                <AnimatePresence>
                  {state.data.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Badge
                        variant="secondary"
                        className="flex items-center space-x-1 px-3 py-1"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {state.data.skills.length === 0 && (
                  <p className="text-muted-foreground text-sm">
                    Add skills that are relevant to your target position
                  </p>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <AlignLeft className="w-5 h-5 text-primary" />
                <Label htmlFor="summary" className="text-base font-medium">
                  Professional Summary
                </Label>
              </div>
              
              <Textarea
                id="summary"
                {...register('summary', {
                  required: 'Professional summary is required',
                  minLength: {
                    value: 50,
                    message: 'Summary should be at least 50 characters',
                  },
                })}
                placeholder="Write a compelling professional summary that highlights your key strengths, experience, and career objectives. This should be 2-4 sentences that make a strong first impression."
                rows={4}
                className="resize-none"
              />
              {errors.summary && (
                <p className="text-sm text-destructive">{errors.summary.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Tip: Focus on your most relevant achievements and what makes you unique
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={goToPrevious}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Previous
              </Button>
              <Button
                type="submit"
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                Preview Resume
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}