import React from 'react';
import Header from '@/components/layout/Header';
import Button from '@/components/common/Button';

export default function AboutPage() {
  const handleButtonClick = (message: string) => {
    alert(`Button clicked: ${message}`);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">
            About Page
          </h1>
          
          {/* Introduction Section */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-12">
            <p className="text-lg text-gray-600 mb-6">
              Learn more about our company and mission. We are dedicated to creating amazing web experiences with Next.js, TypeScript, and Tailwind CSS.
            </p>
            <p className="text-gray-500">
              This page demonstrates the reusable Button component with different sizes, shapes, and variants.
            </p>
          </div>

          {/* Button Demonstrations */}
          <div className="max-w-6xl mx-auto">
            
            {/* Size Variations Section */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Button Size Variations
              </h2>
              <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
                <Button
                  size="small"
                  onClick={() => handleButtonClick('Small Button')}
                >
                  Small Button
                </Button>
                
                <Button
                  size="medium"
                  onClick={() => handleButtonClick('Medium Button')}
                >
                  Medium Button
                </Button>
                
                <Button
                  size="large"
                  onClick={() => handleButtonClick('Large Button')}
                >
                  Large Button
                </Button>
              </div>
              
              <div className="text-center text-gray-600">
                <p>Buttons come in three sizes: small, medium, and large.</p>
              </div>
            </div>

            {/* Shape Variations Section */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Button Shape Variations
              </h2>
              <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
                <Button
                  shape="rounded-sm"
                  onClick={() => handleButtonClick('Slightly Rounded')}
                >
                  Slightly Rounded
                </Button>
                
                <Button
                  shape="rounded-md"
                  onClick={() => handleButtonClick('Medium Rounded')}
                >
                  Medium Rounded
                </Button>
                
                <Button
                  shape="rounded-full"
                  onClick={() => handleButtonClick('Fully Rounded')}
                >
                  Fully Rounded
                </Button>
              </div>
              
              <div className="text-center text-gray-600">
                <p>Buttons can have different border radius: rounded-sm, rounded-md, and rounded-full.</p>
              </div>
            </div>

            {/* Variant Variations Section */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Button Variant Variations
              </h2>
              <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
                <Button
                  variant="primary"
                  onClick={() => handleButtonClick('Primary Variant')}
                >
                  Primary
                </Button>
                
                <Button
                  variant="secondary"
                  onClick={() => handleButtonClick('Secondary Variant')}
                >
                  Secondary
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleButtonClick('Outline Variant')}
                >
                  Outline
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={() => handleButtonClick('Ghost Variant')}
                >
                  Ghost
                </Button>
              </div>
              
              <div className="text-center text-gray-600">
                <p>Multiple variants: primary (filled), secondary (gray), outline (bordered), and ghost (minimal).</p>
              </div>
            </div>

            {/* Combined Examples Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Combined Examples
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-3">Large Primary Pill</h3>
                  <Button
                    size="large"
                    shape="rounded-full"
                    variant="primary"
                    onClick={() => handleButtonClick('Large Primary Pill')}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-3">Small Outline</h3>
                  <Button
                    size="small"
                    variant="outline"
                    onClick={() => handleButtonClick('Small Outline')}
                    className="w-full"
                  >
                    Learn More
                  </Button>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-3">Medium Ghost</h3>
                  <Button
                    size="medium"
                    variant="ghost"
                    onClick={() => handleButtonClick('Medium Ghost')}
                    className="w-full"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <Button
                  size="large"
                  shape="rounded-full"
                  variant="secondary"
                  onClick={() => handleButtonClick('Special Button')}
                  className="transform hover:scale-105 transition-transform"
                >
                  ✨ Special Feature Button ✨
                </Button>
              </div>
            </div>

            {/* Disabled State Example */}
            <div className="bg-white rounded-lg shadow-md p-8 mt-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Disabled State
              </h2>
              <div className="flex flex-wrap justify-center items-center gap-6">
                <Button
                  disabled
                  onClick={() => handleButtonClick('This wont work')}
                >
                  Disabled Button
                </Button>
                
                <Button
                  variant="outline"
                  disabled
                  onClick={() => handleButtonClick('This also wont work')}
                >
                  Disabled Outline
                </Button>
              </div>
              <div className="text-center text-gray-600 mt-4">
                <p>Disabled buttons have reduced opacity and don't respond to clicks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}