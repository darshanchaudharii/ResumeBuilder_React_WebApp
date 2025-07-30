import { ResumeData } from '@/context/ResumeContext';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, education, experience, skills, summary } = data;

  return (
    <div className="bg-white text-gray-900 min-h-[11in] w-full shadow-lg font-sans">
      {/* Header with accent */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
        <h1 className="text-4xl font-light mb-4">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {personalInfo.location}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {personalInfo.website}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              LinkedIn Profile
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-light text-blue-600 mb-4 border-b-2 border-blue-100 pb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-light text-blue-600 mb-4 border-b-2 border-blue-100 pb-2">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="absolute left-1.5 top-5 w-0.5 h-full bg-blue-100"></div>
                  
                  <div className="mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-blue-600 font-medium text-lg">{exp.company}</p>
                    <div className="flex justify-between items-center mt-1">
                      {exp.location && (
                        <p className="text-gray-600">{exp.location}</p>
                      )}
                      <p className="text-gray-500 text-sm font-medium">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-light text-blue-600 mb-4 border-b-2 border-blue-100 pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-blue-600 font-medium">{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 font-medium">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-2xl font-light text-blue-600 mb-4 border-b-2 border-blue-100 pb-2">
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-50 text-blue-800 rounded-full text-sm font-medium border border-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}