import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, Calendar, Video } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCVs, useApplications, useInterviews, useJobs } from './useServices';
import Navbar from '@/components/layout/Navbar';

const FistPageAfterLogin: React.FC = () => {
  const { user } = useAuth();

  const { data: cvs, isLoading: cvsLoading } = useCVs();
  const { data: applications, isLoading: appsLoading } = useApplications();
  const { data: interviews, isLoading: interviewsLoading } = useInterviews();
  const { data: jobs, isLoading: jobsLoading } = useJobs();

  console.log(cvs, applications, interviews, jobs);
  
  const loading = cvsLoading || appsLoading || interviewsLoading || jobsLoading;

  // Extract the actual arrays from the nested response objects
  const cvsArray = cvs?.cvs || [];
  const applicationsArray = applications?.applications || [];
  const interviewsArray = interviews?.sessions || [];

  return (
    <div className="container mx-auto p-6">
      <Navbar />

      <div className="mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold">Bienvenue{user ? `, ${user.first_name}` : ''}!</h2>
          <p className="text-sm opacity-90">Prêt à poursuivre votre carrière ?</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 transition-all duration-300">

        <Card icon={<Briefcase />} title="Create New CV " subtitle={`${jobs?.total ?? 0} disponibles`} linkTo="/CreateNewCv" />
        <Card icon={<FileText />} title="Job Search" subtitle={`${cvs?.count ?? 0}`} linkTo="/cvs" />
        <Card icon={<Calendar />} title="Interview Simulator" subtitle={`${applications?.count ?? 0}`} linkTo="/applications" />
        <Card icon={<Video />} title="AI Writing" subtitle={`${interviews?.count ?? 0}`} linkTo="/interviews" />
      </div>

      {loading ? (
        <div className="text-center py-12">Chargement des données...</div>
      ) : (
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Section title="Recent CVs">
            {cvsArray.length > 0 ? (
              cvsArray.slice(0, 5).map((cv) => (
                <ListItem
                  key={cv._id}
                  title={cv.title || 'Sans titre'}
                  subtitle={`${(cv.language || '').toUpperCase()} • ${cv.updated_at ? new Date(cv.updated_at).toLocaleDateString() : ''}`}
                />
              ))
            ) : (
              <EmptyState 
                title="Aucun CV" 
                description="Vous n'avez pas encore créé de CV." 
                linkTo="/cvs" 
                linkText="Créer votre premier CV" 
              />
            )}
          </Section>

          <Section title="Recent Applications">
            {applicationsArray.length > 0 ? (
              applicationsArray.slice(0, 5).map((app) => (
                <ListItem 
                  key={app._id} 
                  title={app.job_id?.title || app.job_id?.company || 'Candidature'} 
                  subtitle={`${app.applied_at ? new Date(app.applied_at).toLocaleDateString() : ''} • ${app.status}`} 
                />
              ))
            ) : (
              <EmptyState 
                title="Aucune candidature" 
                description="Vous n'avez pas encore postulé." 
                linkTo="/jobs" 
                linkText="Commencer la recherche" 
              />
            )}
          </Section>

          <Section title="Recent Interview Results">
            {interviewsArray.length > 0 ? (
              interviewsArray.slice(0, 6).map((intv) => (
                <ListItem 
                  key={intv._id} 
                  title={intv.job_title} 
                  subtitle={`${new Date(intv.created_at).toLocaleDateString()} • Score: ${intv.score ?? 'N/A'}`} 
                />
              ))
            ) : (
              <EmptyState 
                title="Aucune session" 
                description="Aucune session d'entretien récente." 
                linkTo="/interviews" 
                linkText="Démarrer une session" 
              />
            )}
          </Section>
        </div>
      )}
    </div>
  );
};

const Card: React.FC<{ icon: React.ReactNode; title: string; subtitle?: string; linkTo?: string ;color?:String; }> = ({ icon, title, subtitle, linkTo,color }) => (
  <div className="p-4 bg-white rounded-lg shadow-xl border  border-indigo-600 block items-center justify-center space-y-2">
    {linkTo ? (
      <Link to={linkTo} className="text-blue-600 flex justify-center text-center">
        {icon}
      </Link>
    ) : (
      <div className="text-blue-600 flex justify-center text-center">{icon}</div>
    )}
    <div>
      <div className="text-xl text-center font-semibold">{title}</div>
      <div className={`text-sm text-muted-foreground text-center text-${color}  `}>{subtitle}</div>
    </div>
  </div>
);

const Section: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
  <div className="m-6  bg-white rounded-lg border  border-indigo-500 shadow-xl p-4">
    <div className="flex justify-between items-center border-b-4 border-indigo-500 mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <button className="text-blue-600 hover:text-blue-800">View All</button>
    </div>
    {children}
  </div>
);

const ListItem: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="flex items-center justify-between p-3 border border-gray-950  ">
    <div>
      <div className="font-medium">{title}</div>
      {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
    </div>
    <div className="text-sm text-blue-600">Voir</div>
  </div>
);

const EmptyState: React.FC<{ title: string; description?: string; linkTo?: string; linkText?: string }> = ({ title, description, linkTo, linkText }) => (
  <div className="text-center py-8">
    <div className="text-lg font-medium mb-2">{title}</div>
    {description && <div className="text-sm text-muted-foreground mb-4">{description}</div>}
    {linkTo && (
      <Link to={linkTo} className="px-4 py-2 bg-blue-600 text-white ">
        {linkText || 'Ouvrir'}
      </Link>
    )}
  </div>
);

export default FistPageAfterLogin;