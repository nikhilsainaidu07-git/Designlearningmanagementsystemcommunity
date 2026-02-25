import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Lightbulb, Play, RotateCcw, Code, Beaker, Calculator, Palette, BookOpen } from 'lucide-react';
import { Slider } from '../ui/slider';

interface VirtualExamplesProps {
  course: any;
}

export function VirtualExamples({ course }: VirtualExamplesProps) {
  const [activeExample, setActiveExample] = useState<string | null>(null);
  const [interactiveValues, setInteractiveValues] = useState<any>({
    value1: 50,
    value2: 30,
    value3: 20,
  });

  // Interactive examples based on course type
  const examples = [
    {
      id: 'visual-demo',
      title: 'Visual Demonstration',
      description: 'See concepts come to life with interactive visualizations',
      icon: Palette,
      type: 'visualization',
    },
    {
      id: 'code-sandbox',
      title: 'Code Sandbox',
      description: 'Experiment with code examples in real-time',
      icon: Code,
      type: 'code',
    },
    {
      id: 'simulation',
      title: 'Interactive Simulation',
      description: 'Explore scenarios and see outcomes change dynamically',
      icon: Beaker,
      type: 'simulation',
    },
    {
      id: 'calculator',
      title: 'Concept Calculator',
      description: 'Calculate and visualize mathematical concepts',
      icon: Calculator,
      type: 'calculator',
    },
    {
      id: 'case-study',
      title: 'Real-World Case Study',
      description: 'Learn from practical applications and examples',
      icon: BookOpen,
      type: 'case-study',
    },
  ];

  const handleReset = () => {
    setInteractiveValues({
      value1: 50,
      value2: 30,
      value3: 20,
    });
  };

  const renderVisualization = () => {
    const total = interactiveValues.value1 + interactiveValues.value2 + interactiveValues.value3;
    const percent1 = (interactiveValues.value1 / total) * 100;
    const percent2 = (interactiveValues.value2 / total) * 100;
    const percent3 = (interactiveValues.value3 / total) * 100;

    return (
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
          <h4 className="text-lg mb-4">Interactive Data Visualization</h4>
          
          {/* Bar Chart */}
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Category A: {interactiveValues.value1}</span>
                <span className="text-sm text-gray-600">{percent1.toFixed(1)}%</span>
              </div>
              <div className="h-8 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                  style={{ width: `${percent1}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Category B: {interactiveValues.value2}</span>
                <span className="text-sm text-gray-600">{percent2.toFixed(1)}%</span>
              </div>
              <div className="h-8 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${percent2}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Category C: {interactiveValues.value3}</span>
                <span className="text-sm text-gray-600">{percent3.toFixed(1)}%</span>
              </div>
              <div className="h-8 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-pink-600 transition-all duration-500"
                  style={{ width: `${percent3}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="flex justify-center mb-6">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="20" />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="20"
                strokeDasharray={`${percent1 * 5.65} 565`}
                strokeDashoffset="0"
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#a855f7"
                strokeWidth="20"
                strokeDasharray={`${percent2 * 5.65} 565`}
                strokeDashoffset={`-${percent1 * 5.65}`}
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#ec4899"
                strokeWidth="20"
                strokeDasharray={`${percent3 * 5.65} 565`}
                strokeDashoffset={`-${(percent1 + percent2) * 5.65}`}
                transform="rotate(-90 100 100)"
              />
            </svg>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">Adjust Category A</label>
              <Slider
                value={[interactiveValues.value1]}
                onValueChange={(value) =>
                  setInteractiveValues({ ...interactiveValues, value1: value[0] })
                }
                max={100}
                step={1}
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">Adjust Category B</label>
              <Slider
                value={[interactiveValues.value2]}
                onValueChange={(value) =>
                  setInteractiveValues({ ...interactiveValues, value2: value[0] })
                }
                max={100}
                step={1}
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">Adjust Category C</label>
              <Slider
                value={[interactiveValues.value3]}
                onValueChange={(value) =>
                  setInteractiveValues({ ...interactiveValues, value3: value[0] })
                }
                max={100}
                step={1}
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            💡 <strong>Learning Point:</strong> Observe how changing one value affects the entire
            distribution. This demonstrates the relationship between parts and the whole in data
            visualization.
          </p>
        </div>
      </div>
    );
  };

  const renderCodeSandbox = () => {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm">
          <pre>{`// Interactive Code Example
function calculateAverage(numbers) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum / numbers.length;
}

// Try different values:
const testData = [${interactiveValues.value1}, ${interactiveValues.value2}, ${interactiveValues.value3}];
const average = calculateAverage(testData);

console.log('Average:', average.toFixed(2));
// Output: Average: ${(
            (interactiveValues.value1 + interactiveValues.value2 + interactiveValues.value3) /
            3
          ).toFixed(2)}

// Distribution Analysis:
testData.forEach((value, index) => {
  const deviation = value - average;
  console.log(\`Value \${index + 1}: \${value} (deviation: \${deviation.toFixed(2)})\`);
});`}</pre>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm mb-2 block">Value 1</label>
            <input
              type="number"
              value={interactiveValues.value1}
              onChange={(e) =>
                setInteractiveValues({
                  ...interactiveValues,
                  value1: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Value 2</label>
            <input
              type="number"
              value={interactiveValues.value2}
              onChange={(e) =>
                setInteractiveValues({
                  ...interactiveValues,
                  value2: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Value 3</label>
            <input
              type="number"
              value={interactiveValues.value3}
              onChange={(e) =>
                setInteractiveValues({
                  ...interactiveValues,
                  value3: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-900">
            💡 <strong>Learning Point:</strong> Modify the values above to see how the code executes
            with different inputs. This helps understand how functions process data dynamically.
          </p>
        </div>
      </div>
    );
  };

  const renderSimulation = () => {
    const velocity = interactiveValues.value1;
    const angle = interactiveValues.value2;
    const gravity = 9.8;

    // Simple projectile motion calculation
    const timeOfFlight = (2 * velocity * Math.sin((angle * Math.PI) / 180)) / gravity;
    const maxHeight =
      (velocity * velocity * Math.sin((angle * Math.PI) / 180) * Math.sin((angle * Math.PI) / 180)) /
      (2 * gravity);
    const range =
      (velocity * velocity * Math.sin((2 * angle * Math.PI) / 180)) / gravity;

    return (
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
          <h4 className="text-lg mb-4">Physics Simulation: Projectile Motion</h4>

          {/* Visual Representation */}
          <div className="relative h-64 bg-white rounded-lg mb-6 overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-600 to-green-800"></div>
            <svg className="w-full h-full">
              <path
                d={`M 50 ${260 - maxHeight * 2} Q ${50 + range / 2} ${260 - maxHeight * 4} ${50 + range} 260`}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <circle cx="50" cy="260" r="8" fill="#ef4444" />
              <text x="55" y="255" className="text-xs" fill="#666">
                Start
              </text>
            </svg>
          </div>

          {/* Controls */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm mb-2 block">
                Initial Velocity: {velocity} m/s
              </label>
              <Slider
                value={[interactiveValues.value1]}
                onValueChange={(value) =>
                  setInteractiveValues({ ...interactiveValues, value1: value[0] })
                }
                max={100}
                step={1}
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">
                Launch Angle: {angle}°
              </label>
              <Slider
                value={[interactiveValues.value2]}
                onValueChange={(value) =>
                  setInteractiveValues({ ...interactiveValues, value2: value[0] })
                }
                max={90}
                step={1}
              />
            </div>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Time of Flight</div>
              <div className="text-2xl text-blue-600">{timeOfFlight.toFixed(2)}s</div>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Maximum Height</div>
              <div className="text-2xl text-green-600">{maxHeight.toFixed(2)}m</div>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Range</div>
              <div className="text-2xl text-purple-600">{range.toFixed(2)}m</div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-900">
            💡 <strong>Learning Point:</strong> This simulation demonstrates how velocity and angle
            affect projectile motion. Experiment with different values to understand the
            relationship between these variables.
          </p>
        </div>
      </div>
    );
  };

  const renderCalculator = () => {
    const principal = interactiveValues.value1 * 100;
    const rate = interactiveValues.value2 / 10;
    const time = interactiveValues.value3 / 2;
    const simpleInterest = (principal * rate * time) / 100;
    const compoundInterest = principal * Math.pow(1 + rate / 100, time) - principal;

    return (
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
          <h4 className="text-lg mb-4">Financial Calculator</h4>

          {/* Input Controls */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm mb-2 block">
                Principal Amount: ${principal.toLocaleString()}
              </label>
              <Slider
                value={[interactiveValues.value1]}
                onValueChange={(value) =>
                  setInteractiveValues({ ...interactiveValues, value1: value[0] })
                }
                max={100}
                step={1}
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">
                Interest Rate: {rate.toFixed(1)}% per year
              </label>
              <Slider
                value={[interactiveValues.value2]}
                onValueChange={(value) =>
                  setInteractiveValues({ ...interactiveValues, value2: value[0] })
                }
                max={100}
                step={1}
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">
                Time Period: {time.toFixed(1)} years
              </label>
              <Slider
                value={[interactiveValues.value3]}
                onValueChange={(value) =>
                  setInteractiveValues({ ...interactiveValues, value3: value[0] })
                }
                max={100}
                step={1}
              />
            </div>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-white rounded-lg border-2 border-blue-200">
              <div className="text-sm text-gray-600 mb-1">Simple Interest</div>
              <div className="text-3xl text-blue-600 mb-2">
                ${simpleInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-gray-600">
                Total: ${(principal + simpleInterest).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border-2 border-green-200">
              <div className="text-sm text-gray-600 mb-1">Compound Interest</div>
              <div className="text-3xl text-green-600 mb-2">
                ${compoundInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-gray-600">
                Total: ${(principal + compoundInterest).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Comparison Chart */}
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm mb-2">Interest Comparison</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs w-24">Simple</span>
                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{
                      width: `${(simpleInterest / (principal + compoundInterest)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs w-24">Compound</span>
                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${(compoundInterest / (principal + compoundInterest)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg">
          <p className="text-sm text-orange-900">
            💡 <strong>Learning Point:</strong> Compare how simple and compound interest grow over
            time. Notice how compound interest accelerates as the principal increases with each
            period.
          </p>
        </div>
      </div>
    );
  };

  const renderCaseStudy = () => {
    return (
      <div className="space-y-4">
        <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
          <h4 className="text-xl mb-4">Real-World Case Study</h4>
          <div className="space-y-4">
            <div>
              <h5 className="mb-2">Scenario</h5>
              <p className="text-gray-700">
                A major technology company implemented the concepts from this course to improve their
                product development process. Let's analyze their approach and outcomes.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h5 className="mb-2">Challenge</h5>
              <p className="text-gray-700 text-sm">
                The company was struggling with long development cycles and poor cross-team
                collaboration. Projects were taking 40% longer than estimated.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h5 className="mb-2">Solution Applied</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Implemented agile methodologies from Module 1</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Applied communication frameworks from Module 2</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Used data-driven decision making from Module 3</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h5 className="mb-2">Results</h5>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="text-center p-3 bg-green-50 rounded">
                  <div className="text-3xl text-green-600">↓35%</div>
                  <div className="text-xs text-gray-600 mt-1">Development Time</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded">
                  <div className="text-3xl text-blue-600">↑60%</div>
                  <div className="text-xs text-gray-600 mt-1">Team Satisfaction</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded">
                  <div className="text-3xl text-purple-600">↑45%</div>
                  <div className="text-xs text-gray-600 mt-1">Product Quality</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded">
                  <div className="text-3xl text-orange-600">↓50%</div>
                  <div className="text-xs text-gray-600 mt-1">Bug Reports</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h5 className="mb-2">Key Takeaways</h5>
              <ol className="space-y-2 text-sm list-decimal list-inside">
                <li>Systematic application of course principles leads to measurable improvements</li>
                <li>Cross-functional collaboration is essential for success</li>
                <li>Continuous monitoring and adjustment optimize outcomes</li>
                <li>Stakeholder buy-in accelerates implementation</li>
              </ol>
            </div>
          </div>
        </Card>

        <div className="p-4 bg-indigo-50 rounded-lg">
          <p className="text-sm text-indigo-900">
            💡 <strong>Learning Point:</strong> This case study demonstrates how theoretical
            concepts translate into practical business value. Consider how you might apply similar
            approaches in your own context.
          </p>
        </div>
      </div>
    );
  };

  const renderExampleContent = (exampleId: string) => {
    switch (exampleId) {
      case 'visual-demo':
        return renderVisualization();
      case 'code-sandbox':
        return renderCodeSandbox();
      case 'simulation':
        return renderSimulation();
      case 'calculator':
        return renderCalculator();
      case 'case-study':
        return renderCaseStudy();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-8 h-8 text-yellow-500" />
          <div>
            <h2 className="text-2xl">Virtual Examples & Simulations</h2>
            <p className="text-gray-600">
              Interactive examples to help you understand concepts better
            </p>
          </div>
        </div>
      </Card>

      {!activeExample ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {examples.map((example) => {
            const Icon = example.icon;
            return (
              <Card
                key={example.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveExample(example.id)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2">{example.title}</h3>
                    <p className="text-sm text-gray-600">{example.description}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Launch Example
                </Button>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setActiveExample(null)}>
              ← Back to Examples
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Values
            </Button>
          </div>

          {renderExampleContent(activeExample)}
        </div>
      )}
    </div>
  );
}
