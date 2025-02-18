import React from 'react';
import { UploadCloud, FileText, TestTube2, AlertTriangle } from 'lucide-react';

export default function Blodtest() {
  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8'>
        {/* Header Section with Icon */}
        <div className='mb-8 text-center'>
          <div className='flex'>
          <div className='mx-auto bg-blue-100 w-fit p-4 rounded-full mb-4'>
            <TestTube2 className='h-8 w-8 text-blue-600' />
          </div>
          <h1 className='text-3xl font-bold text-gray-900 mt-4'>
            Blood Test <span className='text-blue-600'>Analysis</span>
          </h1></div>
          <p className='mt-3 text-sm text-gray-500'>
            Upload your blood test results for instant analysis and better understanding of your health status
          </p>
        </div>

        {/* Upload Form */}
        <form className='space-y-6'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              <FileText className='inline-block h-4 w-4 mr-2 text-blue-600' />
              Upload Blood Test Results
              <span className='text-blue-600 ml-1'>*</span>
            </label>
            
            {/* File Upload Area */}
            <div className='mt-1 flex justify-center px-6 pt-8 pb-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors'>
              <div className='text-center'>
                <UploadCloud className='mx-auto h-12 w-12 text-gray-400' />
                <div className='mt-4 text-sm text-gray-600'>
                  <p className='font-medium'>Drag and drop files here</p>
                  <p className='mt-1'>or</p>
                  <input
                    type="file"
                    id="upload-picture"
                    accept=".pdf, .jpg, .png"
                    className='sr-only'
                  />
                  <label
                    htmlFor="upload-picture"
                    className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500'
                  >
                    <span>Browse files</span>
                  </label>
                </div>
                <p className='mt-2 text-xs text-gray-500'>
                  Supported formats: PDF, JPG, PNG (max 5MB)
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className='w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'
          >
            <TestTube2 className='w-4 h-4 mr-2' />
            Analyze Results
          </button>
        </form>

        {/* Note Section with Icon */}
        <div className='mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200'>
          <div className='flex items-start'>
            <AlertTriangle className='h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5' />
            <div className='ml-3'>
              <h3 className='text-sm font-medium text-yellow-800'>Important Note</h3>
              <p className='mt-1 text-sm text-yellow-700'>
                This analysis provides preliminary insights only. For accurate diagnosis and treatment recommendations, 
                always consult with a qualified healthcare professional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
