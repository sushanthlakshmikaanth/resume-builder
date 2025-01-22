import React, { useState } from 'react';
import { Upload, CheckCircle2, XCircle, RefreshCcw, FileText, Award, Briefcase, GraduationCap, Trash2, Download, BarChart3, Target, Clock, Edit2, Save, X, Share2, Printer, History, BookMarked, MessageSquare, ArrowUpRight, Sparkles } from 'lucide-react';

interface AnalysisResult {
  score: number;
  strengths: string[];
  improvements: string[];
  keywords: string[];
  education: number;
  experience: number;
  skills: number;
  readability: number;
  atsCompatibility: number;
  estimatedInterviewRate: number;
  topIndustryFit: string[];
  wordCount: number;
  processingTime: string;
  content?: string;
  version?: number;
}

interface AIFeedback {
  suggestion: string;
  section: string;
  priority: 'high' | 'medium' | 'low';
}

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showTips, setShowTips] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showAIFeedback, setShowAIFeedback] = useState(false);
  const [aiFeedback, setAIFeedback] = useState<AIFeedback[]>([]);
  const [jobDescription, setJobDescription] = useState('');
  const [showJobMatch, setShowJobMatch] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'application/pdf') {
      setFile(droppedFile);
      analyzeResume(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      analyzeResume(selectedFile);
    }
  };

  const analyzeResume = async (file: File) => {
    setAnalyzing(true);
    setShowTips(false);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newResult: AnalysisResult = {
      score: 85,
      strengths: [
        'Strong technical skills section',
        'Clear work experience format',
        'Good use of action verbs',
        'Excellent education background',
        'Relevant certifications included'
      ],
      improvements: [
        'Add more quantifiable achievements',
        'Include a professional summary',
        'Enhance keywords for ATS optimization',
        'Add LinkedIn profile',
        'Consider adding a projects section'
      ],
      keywords: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'API Development', 'AWS', 'Docker', 'CI/CD'],
      education: 90,
      experience: 85,
      skills: 80,
      readability: 92,
      atsCompatibility: 88,
      estimatedInterviewRate: 75,
      topIndustryFit: ['Software Development', 'Web Development', 'Cloud Computing'],
      wordCount: 495,
      processingTime: '1.2 seconds',
      version: history.length + 1,
      content: `John Doe
Senior Software Engineer

SUMMARY
Results-driven software engineer with 5+ years of experience in full-stack development.

EXPERIENCE
Senior Software Engineer | Tech Corp
2020 - Present
- Led development of microservices architecture
- Implemented CI/CD pipeline
- Mentored junior developers

Software Engineer | StartupCo
2018 - 2020
- Developed React applications
- Optimized database performance
- Implemented REST APIs

EDUCATION
Bachelor of Science in Computer Science
University of Technology, 2018

SKILLS
- JavaScript/TypeScript
- React/Node.js
- AWS/Docker
- CI/CD
- Database Design`
    };
    
    setResult(newResult);
    setHistory(prev => [...prev, newResult]);
    setEditedContent(newResult.content || '');
    
    setAIFeedback([
      {
        suggestion: "Add specific metrics to your achievements",
        section: "Experience",
        priority: "high"
      },
      {
        suggestion: "Include relevant certifications",
        section: "Education",
        priority: "medium"
      },
      {
        suggestion: "Add a link to your GitHub profile",
        section: "Contact",
        priority: "low"
      }
    ]);
    
    setAnalyzing(false);
  };

  const handleJobDescriptionMatch = () => {
    setShowJobMatch(true);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
    }, 1500);
  };

  const shareResume = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
  };

  const printResume = () => {
    window.print();
  };

  const restoreVersion = (version: AnalysisResult) => {
    setResult(version);
    setEditedContent(version.content || '');
    setShowHistory(false);
  };

  const handleSaveEdit = () => {
    if (result) {
      const updatedResult = {
        ...result,
        content: editedContent,
        version: (result.version || 0) + 1
      };
      setResult(updatedResult);
      setHistory(prev => [...prev, updatedResult]);
      setIsEditing(false);
      analyzeResume(file!); // Re-analyze with new content
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setResult(null);
    setShowTips(false);
    setHistory([]);
    setShowHistory(false);
    setShowAIFeedback(false);
    setJobDescription('');
    setShowJobMatch(false);
    setIsEditing(false);
    setEditedContent('');
  };

  const downloadReport = () => {
    alert('Downloading detailed PDF report...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Resume Analyzer</h1>
          <p className="text-gray-600 text-lg">Upload your resume and get instant professional feedback with AI-powered analysis</p>
          {!file && (
            <div className="mt-6 flex justify-center gap-4">
              <button 
                onClick={() => setShowTips(true)}
                className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
              >
                <Target className="w-5 h-5" />
                Resume Writing Tips
              </button>
              <button 
                className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
              >
                <BarChart3 className="w-5 h-5" />
                View Sample Report
              </button>
            </div>
          )}
        </header>

        {showTips && !file && (
          <div className="bg-white rounded-lg p-8 mb-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Resume Writing Tips</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Do's</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Use action verbs to describe achievements
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Include quantifiable results
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Tailor resume to job description
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Don'ts</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    Use generic objectives
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    Include personal information
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    Use complex formatting
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {!file && !analyzing && (
          <div
            className={`border-4 border-dashed rounded-lg p-12 text-center transition-all ${
              isDragging
                ? 'border-indigo-400 bg-indigo-50'
                : 'border-gray-300 bg-white'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-20 h-20 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-semibold mb-2">
              Drag & Drop your resume here
            </h3>
            <p className="text-gray-500 mb-4">or</p>
            <label className="bg-indigo-600 text-white px-8 py-4 rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors text-lg">
              Browse Files
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileInput}
              />
            </label>
            <p className="text-sm text-gray-400 mt-4">Supports PDF files only</p>
          </div>
        )}

        {analyzing && (
          <div className="bg-white rounded-lg p-12 text-center">
            <RefreshCcw className="w-20 h-20 mx-auto mb-6 text-indigo-600 animate-spin" />
            <h3 className="text-2xl font-semibold mb-2">Analyzing your resume...</h3>
            <p className="text-gray-500">Our AI is reviewing your resume for optimal results</p>
          </div>
        )}

        {result && !analyzing && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Analysis Results</h2>
                  <p className="text-gray-500 mt-1">Version {result.version} • {result.wordCount} words • {result.processingTime}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    {isEditing ? <X className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                  <button
                    onClick={() => setShowAIFeedback(!showAIFeedback)}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Sparkles className="w-5 h-5" />
                    AI Feedback
                  </button>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <History className="w-5 h-5" />
                    History
                  </button>
                  <button
                    onClick={shareResume}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                  <button
                    onClick={printResume}
                    className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Printer className="w-5 h-5" />
                    Print
                  </button>
                  <button
                    onClick={resetAnalysis}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {isEditing ? (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Edit Resume</h3>
                    <button
                      onClick={handleSaveEdit}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </button>
                  </div>
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full h-96 p-4 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
                    placeholder="Edit your resume content here..."
                  />
                </div>
              ) : (
                <>
                  {showHistory && (
                    <div className="mb-8 bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">Version History</h3>
                      <div className="space-y-4">
                        {history.map((version, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                            <div>
                              <p className="font-medium">Version {version.version}</p>
                              <p className="text-sm text-gray-500">Score: {version.score}%</p>
                            </div>
                            <button
                              onClick={() => restoreVersion(version)}
                              className="text-indigo-600 hover:text-indigo-700"
                            >
                              Restore
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {showAIFeedback && (
                    <div className="mb-8 bg-purple-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Sparkles className="w-6 h-6 text-purple-600 mr-2" />
                        AI Suggestions
                      </h3>
                      <div className="space-y-4">
                        {aiFeedback.map((feedback, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-700">{feedback.section}</span>
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                feedback.priority === 'high' ? 'bg-red-100 text-red-700' :
                                feedback.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {feedback.priority} priority
                              </span>
                            </div>
                            <p className="text-gray-600">{feedback.suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-8 bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <BookMarked className="w-6 h-6 text-blue-600 mr-2" />
                      Job Description Matcher
                    </h3>
                    <div className="space-y-4">
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste job description here to see how well your resume matches..."
                        className="w-full h-32 p-4 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={handleJobDescriptionMatch}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Analyze Match
                      </button>
                      {showJobMatch && (
                        <div className="bg-white p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-medium">Match Score</span>
                            <span className="text-2xl font-bold text-blue-600">78%</span>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">• 8/10 required skills matched</p>
                            <p className="text-sm text-gray-600">• Experience level aligns well</p>
                            <p className="text-sm text-gray-600">• Consider adding: Docker, Kubernetes</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-6 mb-8">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <FileText className="w-8 h-8 text-green-600 mb-2" />
                      <h3 className="font-semibold mb-2">Overall Score</h3>
                      <p className="text-3xl font-bold text-green-600">{result.score}%</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <Target className="w-8 h-8 text-blue-600 mb-2" />
                      <h3 className="font-semibold mb-2">ATS Compatibility</h3>
                      <p className="text-3xl font-bold text-blue-600">{result.atsCompatibility}%</p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <BarChart3 className="w-8 h-8 text-purple-600 mb-2" />
                      <h3 className="font-semibold mb-2">Interview Rate</h3>
                      <p className="text-3xl font-bold text-purple-600">{result.estimatedInterviewRate}%</p>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-lg">
                      <Clock className="w-8 h-8 text-orange-600 mb-2" />
                      <h3 className="font-semibold mb-2">Readability</h3>
                      <p className="text-3xl font-bold text-orange-600">{result.readability}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <CheckCircle2 className="w-6 h-6 text-green-500 mr-2" />
                        Strengths
                      </h3>
                      <ul className="space-y-3">
                        {result.strengths.map((strength, index) => (
                          <li
                            key={index}
                            className="flex items-start bg-green-50 p-3 rounded-lg"
                          >
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <XCircle className="w-6 h-6 text-orange-500 mr-2" />
                        Areas for Improvement
                      </h3>
                      <ul className="space-y-3">
                        {result.improvements.map((improvement, index) => (
                          <li
                            key={index}
                            className="flex items-start bg-orange-50 p-3 rounded-lg"
                          >
                            <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2"></span>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Award className="w-6 h-6 text-indigo-500 mr-2" />
                        Key Skills Detected
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Briefcase className="w-6 h-6 text-indigo-500 mr-2" />
                        Top Industry Fit
                      </h3>
                      <div className="space-y-2">
                        {result.topIndustryFit.map((industry, index) => (
                          <div
                            key={index}
                            className="bg-indigo-50 p-3 rounded-lg text-indigo-700 font-medium"
                          >
                            {industry}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">Resume Content</h3>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                      >
                        <Edit2 className="w-5 h-5" />
                        Edit
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap font-mono bg-white p-4 rounded-lg">
                      {result.content}
                    </pre>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;