import { ResumeData } from '@/context/ResumeContext';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ClassicTemplateProps {
  data: ResumeData;
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  const { personalInfo, education, experience, skills, summary } = data;

  return (
    <div className="bg-white text-black p-6 min-h-[11in] w-full font-sans text-sm">
      {/* Header */}
      <div className="border-b border-gray-400 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-center">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-700 mt-2">
          {personalInfo.email && (<span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>)}
          {personalInfo.phone && (<span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>)}
          {personalInfo.location && (<span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.location}</span>)}
          {personalInfo.website && (<span className="flex items-center gap-1"><Globe className="w-3 h-3" />{personalInfo.website}</span>)}
          {personalInfo.linkedin && (<span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{personalInfo.linkedin}</span>)}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section className="mb-4">
          <h2 className="font-semibold uppercase text-gray-900 border-b border-gray-300 mb-1">Summary</h2>
          <p className="text-gray-800 leading-snug">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-4">
          <h2 className="font-semibold uppercase text-gray-900 border-b border-gray-300 mb-1">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-medium">{exp.position} - {exp.company}</span>
                <span className="text-xs text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              {exp.location && <p className="text-xs text-gray-600">{exp.location}</p>}
              <p className="text-xs text-gray-800 whitespace-pre-wrap">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="font-semibold uppercase text-gray-900 border-b border-gray-300 mb-1">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-1">
              <div className="flex justify-between">
                <span className="font-medium">{edu.degree} in {edu.field}, {edu.institution}</span>
                <span className="text-xs text-gray-600">
  {edu.startDate} - {String(edu.current) === 'true' ? 'Present' : edu.endDate}
</span>


              </div>
              {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="font-semibold uppercase text-gray-900 border-b border-gray-300 mb-1">Skills</h2>
          <p className="text-sm text-gray-800 leading-relaxed">
            {skills.join(', ')}
          </p>
        </section>
      )}
    </div>
  );
}