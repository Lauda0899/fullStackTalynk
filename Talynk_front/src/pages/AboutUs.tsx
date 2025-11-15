import { useState } from 'react';
import { Briefcase, Target, Users, Award, TrendingUp, Shield, Heart, Zap, Globe, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { icon: <Briefcase className="w-8 h-8" />, value: '50,000+', label: 'Active Jobs', color: 'blue' },
    { icon: <Users className="w-8 h-8" />, value: '100,000+', label: 'Job Seekers', color: 'green' },
    { icon: <Award className="w-8 h-8" />, value: '5,000+', label: 'Companies', color: 'purple' },
    { icon: <TrendingUp className="w-8 h-8" />, value: '95%', label: 'Success Rate', color: 'orange' }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Our Mission',
      description: 'To connect talented individuals with their dream careers and help companies find the perfect candidates. We believe everyone deserves meaningful work.',
      color: 'blue'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Passion for People',
      description: 'We are passionate about helping people succeed. Every job match we make changes lives and drives careers forward.',
      color: 'red'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Trust & Integrity',
      description: 'We maintain the highest standards of integrity in all our interactions. Your data is secure, and our listings are verified.',
      color: 'green'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Innovation First',
      description: 'We leverage cutting-edge technology and AI to make job searching smarter, faster, and more effective than ever before.',
      color: 'yellow'
    }
  ];

  const features = [
    {
      title: 'Smart Job Matching',
      description: 'Our AI-powered algorithm matches you with jobs that fit your skills, experience, and career goals.',
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: 'Resume Builder',
      description: 'Create professional resumes in minutes with our easy-to-use builder and industry-approved templates.',
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      title: 'Interview Preparation',
      description: 'Practice with our AI interview simulator and get personalized feedback to ace your interviews.',
      icon: <Users className="w-6 h-6" />
    },
    {
      title: 'Career Resources',
      description: 'Access a wealth of career advice, industry insights, and professional development resources.',
      icon: <Award className="w-6 h-6" />
    },
    {
      title: 'Company Insights',
      description: 'Get detailed information about companies, including culture, benefits, and employee reviews.',
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: 'Application Tracking',
      description: 'Keep track of all your applications in one place and never miss a follow-up.',
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '👩‍💼',
      description: '15+ years in HR and recruitment'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '👨‍💻',
      description: 'Tech innovator and AI specialist'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: '👩‍💼',
      description: 'Operations and customer success expert'
    },
    {
      name: 'David Thompson',
      role: 'Head of Marketing',
      image: '👨‍💼',
      description: 'Brand strategist and growth hacker'
    }
  ];

  const timeline = [
    { year: '2020', title: 'Founded', description: 'Started with a vision to revolutionize job search' },
    { year: '2021', title: 'Series A Funding', description: 'Raised $10M to expand our platform' },
    { year: '2022', title: 'AI Integration', description: 'Launched AI-powered job matching' },
    { year: '2023', title: '100K Users', description: 'Reached 100,000 active job seekers' },
    { year: '2024', title: 'Global Expansion', description: 'Expanded to 25+ countries worldwide' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Our Platform</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to transform the way people find jobs and companies hire talent. 
              Join us in building a future where everyone finds work they love.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className={`inline-block p-4 bg-${stat.color}-100 rounded-full text-${stat.color}-600 mb-4`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Our Story */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Founded in 2020, our job search platform was born from a simple observation: the traditional job search 
                process was broken. Job seekers spent countless hours scrolling through irrelevant listings, while companies 
                struggled to find qualified candidates.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We knew there had to be a better way. By combining cutting-edge AI technology with a deep understanding 
                of what both job seekers and employers need, we created a platform that makes finding the right job—or 
                the right candidate—faster, easier, and more successful than ever before.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, we're proud to serve over 100,000 job seekers and 5,000+ companies worldwide. But we're just 
                getting started. Our vision is to create a world where everyone has access to meaningful work that 
                aligns with their skills, values, and aspirations.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all">
                <div className={`inline-block p-4 bg-${value.color}-100 rounded-full text-${value.color}-600 mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What We Offer</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Powerful tools and features to accelerate your career</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-indigo-600"></div>
              
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="relative pl-20">
                    <div className="absolute left-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {item.year}
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Passionate professionals dedicated to your success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <div className="text-blue-600 font-semibold mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-blue-100 text-lg">Have questions? We'd love to hear from you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-blue-100">support@jobsearch.com</p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-blue-100">+1 (555) 123-4567</p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-blue-100">123 Career Street, NY 10001</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Find Your Dream Job?</h2>
          <p className="text-gray-600 text-lg mb-8">
            Join thousands of job seekers who have found their perfect career match with us
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}