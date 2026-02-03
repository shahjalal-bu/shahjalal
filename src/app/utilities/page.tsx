"use client"

import Link from 'next/link';
import { Code2, Zap, Sparkles, ArrowRight, Users, Save, Search, Share2 } from 'lucide-react';

export default function UtilitiesPage() {
  const utilities = [
    {
      id: 'live-share',
      title: 'Live Code Share',
      description: 'Collaborate in real-time with others. Create a room, share the link, and code together instantly.',
      icon: Users,
      href: '/live-share',
      color: 'blue',
      features: [
        'Real-time collaboration',
        'Shareable room links',
        'Multi-user support',
        'Participant tracking',
      ],
      badge: 'Popular',
    },
    {
      id: 'code-snippets',
      title: 'Code Snippet Manager',
      description: 'Save, organize, and manage your code snippets. Search, filter, and access your code library from anywhere.',
      icon: Save,
      href: '/code-share',
      color: 'cyan',
      features: [
        'Save code snippets',
        'Search & filter',
        'Import/export',
        'Tag organization',
      ],
      badge: 'New',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Developer Utilities</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Powerful Tools
              <br />
              <span className="text-blue-600 dark:text-blue-400">for Developers</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              A collection of free utilities to boost your productivity. Share code in real-time, manage snippets, and more.
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Zap className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Fast & Free</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Code2 className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">No Sign-up Required</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Utilities Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {utilities.map((utility, index) => {
            const Icon = utility.icon;
            const colorClasses = utility.color === 'blue' 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-cyan-600 hover:bg-cyan-700';
            const badgeClasses = utility.color === 'blue'
              ? 'bg-blue-600'
              : 'bg-cyan-600';
            
            return (
              <div
                key={utility.id}
                className="group relative bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                {/* Badge */}
                {utility.badge && (
                  <div className={`absolute -top-3 -right-3 ${badgeClasses} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm`}>
                    {utility.badge}
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${colorClasses} p-4 mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                  {utility.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {utility.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {utility.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className={`w-1.5 h-1.5 rounded-full ${utility.color === 'blue' ? 'bg-blue-600' : 'bg-cyan-600'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={utility.href}
                  className={`inline-flex items-center gap-2 px-6 py-3 ${colorClasses} text-white rounded-lg font-semibold transition-all transform hover:scale-105 group-hover:gap-3 shadow-sm`}
                >
                  <span>Try it now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-16 border-y border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Why Use These Utilities?</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Built with modern technologies and designed for developers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Optimized for speed and performance',
              },
              {
                icon: Share2,
                title: 'Easy Sharing',
                description: 'Share with one click, no hassle',
              },
              {
                icon: Search,
                title: 'Smart Search',
                description: 'Find what you need instantly',
              },
            ].map((feature, i) => {
              const FeatureIcon = feature.icon;
              return (
                <div
                  key={i}
                  className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <FeatureIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Ready to get started?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Choose a utility above and start boosting your productivity today!
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/live-share"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-sm"
            >
              <Users className="w-5 h-5" />
              <span>Start Collaborating</span>
            </Link>
            
            <Link
              href="/code-share"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-sm"
            >
              <Save className="w-5 h-5" />
              <span>Manage Snippets</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
