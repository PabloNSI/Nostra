import React from "react";
import {
  X,
  Play,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card } from "../Card";
import { Badge } from "../Badge";
import { Button } from "../Button";

interface EntryDetailScreenProps {
  onClose: () => void;
}

export function EntryDetailScreen({
  onClose,
}: EntryDetailScreenProps) {
  const [blackBoxMode, setBlackBoxMode] = React.useState(false);
  const [showBlackBoxDetails, setShowBlackBoxDetails] =
    React.useState(false);
  const [userFeedback, setUserFeedback] = React.useState<
    boolean | null
  >(null);

  const prosodyMetrics = [
    {
      label: "Pitch",
      value: "142 Hz",
      percentage: 65,
      icon: "🎵",
    },
    {
      label: "Energy",
      value: "0.72",
      percentage: 72,
      icon: "⚡",
    },
    {
      label: "Speed",
      value: "3.5 syl/s",
      percentage: 58,
      icon: "⏱️",
    },
    {
      label: "Pauses",
      value: "0.28",
      percentage: 45,
      icon: "⏸️",
    },
  ];

  const linkedNodes = [
    "Work",
    "Team",
    "Project",
    "Meeting",
    "Success",
  ];

  const recommendations = [
    {
      icon: "🎯",
      text: "Continue to encourage these kinds of positive interactions with your team",
    },
    {
      icon: "📝",
      text: "Document these joyful moments for future reference.",
    },
    {
      icon: "🌟",
      text: "Share this achievement with loved ones",
    },
  ];

  // Black Box Analysis Data
  const blackBoxAnalysis = {
    textAnalysis: {
      keywords: ["meeting", "team", "project", "motivated"],
      sentiment: "positive",
      emotionalWords: [
        { word: "happy", emotion: "joy", weight: 1.0 },
        { word: "biggest", emotion: "joy", weight: 0.8 },
        { word: "best", emotion: "joy", weight: 0.9 },
      ],
      negations: [],
      intensifiers: ["very", "really"],
    },
    prosodyAnalysis: {
      interpretation:
        "An upward tone suggests enthusiasm; high energy indicates intense emotion.",
      confidence: 78,
    },
    contextualFactors: {
      timeOfDay: "Afternoon",
      dayOfWeek: "Thursday",
      relatedEntries: 3,
    },
    decisionPath: [
      {
        step: 1,
        rule: "Analysis of emotional words in the text",
        value: 3,
        contribution: 40,
      },
      {
        step: 2,
        rule: "Modifiers detected (0 negations, 2 intensifiers)",
        value: 2,
        contribution: 15,
      },
      {
        step: 3,
        rule: "Prosodic analysis: pitch rising, high energy",
        value: 72,
        contribution: 30,
      },
      {
        step: 4,
        rule: "Multifactor-based confidence calculation",
        value: 85,
        contribution: 15,
      },
    ],
    overallConfidence: 85,
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div style={{ marginLeft: '16px', marginRight: '16px' }} className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 py-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            21 Jan 2026, 12:00
          </p>
          <h2 className="text-slate-200">Details of entry</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div style={{ marginLeft: '16px', marginRight: '16px' }} className="py-6 space-y-6 pb-24">
        {/* Transcript */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300">Transcript</h3>
            <Button variant="ghost" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Play
            </Button>
          </div>
          <p className="text-slate-200 leading-relaxed">
            Today we had a great meeting with the team.
            Everything went better than I expected. The project
            is progressing very well and everyone is very
            motivated. I feel really happy to be working with
            these people.
          </p>
        </Card>

        {/* Emotional Analysis */}
        {!blackBoxMode && (
          <>
            <Card className="p-6">
              <h3 className="text-slate-300 mb-4">
                Emotional analysis
              </h3>

              {/* Primary Emotion */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-5xl">😊</span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-2">
                      <h2 className="text-amber-400">
                        Happiness
                      </h2>
                      <span className="text-slate-400">
                        Primary
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                      <span className="text-slate-300">
                        8.5/10
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Emotions */}
              <div>
                <p className="text-sm text-slate-400 mb-3">
                  Secondary emotions
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge type="emotion" emotion="surprise">
                    Surprise (32%)
                  </Badge>
                  <Badge type="emotion" emotion="fear">
                    Jitters (15%)
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Prosody Analysis */}
            <Card className="p-6">
              <h3 className="text-slate-300 mb-4">
                Voice analysis
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {prosodyMetrics.map((metric) => (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {metric.icon}
                      </span>
                      <span className="text-sm text-slate-400">
                        {metric.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-200">
                        {metric.value}
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{
                          width: `${metric.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Linked Nodes */}
            <Card className="p-6">
              <h3 className="text-slate-300 mb-4">
                Linked nodes
              </h3>
              <div className="flex flex-wrap gap-2">
                {linkedNodes.map((node) => (
                  <Badge key={node}>{node}</Badge>
                ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6">
              <h3 className="text-slate-300 mb-4">
                Recommendations
              </h3>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 bg-slate-700/30 rounded-lg"
                  >
                    <span className="text-2xl flex-shrink-0">
                      {rec.icon}
                    </span>
                    <p className="text-slate-300 text-sm">
                      {rec.text}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {blackBoxMode && (
          <Card className="p-8 text-center">
            <EyeOff className="w-12 h-12 mx-auto mb-4 text-slate-500" />
            <p className="text-slate-400">
              Black Box mode activated. The analysis is hidden.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setShowBlackBoxDetails(!showBlackBoxDetails)
              }
            >
              {showBlackBoxDetails ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              {showBlackBoxDetails
                ? "Hide details"
                : "Show details"}
            </Button>
            {showBlackBoxDetails && (
              <div className="mt-4">
                <h4 className="text-slate-300 mb-2">
                  Text analysis
                </h4>
                <p className="text-sm text-slate-400">
                  Keywords:{" "}
                  {blackBoxAnalysis.textAnalysis.keywords.join(
                    ", ",
                  )}
                </p>
                <p className="text-sm text-slate-400">
                  Feelings:{" "}
                  {blackBoxAnalysis.textAnalysis.sentiment}
                </p>
                <p className="text-sm text-slate-400">
                  Emotional words:{" "}
                  {blackBoxAnalysis.textAnalysis.emotionalWords
                    .map(
                      (word) =>
                        `${word.word} (${word.emotion})`,
                    )
                    .join(", ")}
                </p>
                <p className="text-sm text-slate-400">
                  Modificators:{" "}
                  {blackBoxAnalysis.textAnalysis.intensifiers.join(
                    ", ",
                  )}
                </p>

                <h4 className="text-slate-300 mb-2 mt-4">
                  Prosodic analysis
                </h4>
                <p className="text-sm text-slate-400">
                  Interpretation:{" "}
                  {
                    blackBoxAnalysis.prosodyAnalysis
                      .interpretation
                  }
                </p>
                <p className="text-sm text-slate-400">
                  Trust:{" "}
                  {blackBoxAnalysis.prosodyAnalysis.confidence}%
                </p>

                <h4 className="text-slate-300 mb-2 mt-4">
                  Contextual factors
                </h4>
                <p className="text-sm text-slate-400">
                  time of day:{" "}
                  {blackBoxAnalysis.contextualFactors.timeOfDay}
                </p>
                <p className="text-sm text-slate-400">
                  Day of the week:{" "}
                  {blackBoxAnalysis.contextualFactors.dayOfWeek}
                </p>
                <p className="text-sm text-slate-400">
                  Related entries:{" "}
                  {
                    blackBoxAnalysis.contextualFactors
                      .relatedEntries
                  }
                </p>

                <h4 className="text-slate-300 mb-2 mt-4">
                  Decision path
                </h4>
                <ul className="list-disc list-inside text-sm text-slate-400">
                  {blackBoxAnalysis.decisionPath.map((step) => (
                    <li key={step.step}>
                      Step {step.step}: {step.rule} - Value:{" "}
                      {step.value}, Contribution:{" "}
                      {step.contribution}%
                    </li>
                  ))}
                </ul>

                <h4 className="text-slate-300 mb-2 mt-4">
                  Overall trust
                </h4>
                <p className="text-sm text-slate-400">
                  Overall trust:{" "}
                  {blackBoxAnalysis.overallConfidence}%
                </p>
              </div>
            )}
          </Card>
        )}
      </div>

      {/* Bottom Actions */}
      <div style={{ marginLeft: '16px', marginRight: '16px' }} className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700/50 py-4">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={() => setBlackBoxMode(!blackBoxMode)}
          >
            {blackBoxMode ? (
              <Eye className="w-4 h-4 mr-2" />
            ) : (
              <EyeOff className="w-4 h-4 mr-2" />
            )}
            {blackBoxMode ? "Show" : "Black Box"}
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost">
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button variant="danger">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}