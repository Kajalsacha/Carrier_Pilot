import {
  FolderGit2,
  BookOpen,
  Briefcase,
  AlertTriangle,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import Card from "../common/Card";
import Badge from "../common/Badge";

function SectionHeading({ icon: Icon, title, tone = "indigo" }) {
  const toneClasses = {
    indigo: "bg-[#23364D]/10 text-[#23364D]",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="mb-6 flex items-center gap-3">
      <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneClasses[tone]}`}>
        <Icon size={20} />
      </span>

      <h2 className="text-xl font-semibold text-[#1F2937]">{title}</h2>
    </div>
  );
}

function CareerSections({ roadmap }) {
  return (
    <div className="space-y-6">
      {/* Projects */}

      <Card className="p-6 sm:p-8">
        <SectionHeading icon={FolderGit2} title="Resume Projects" />

        <div className="space-y-5">
          {roadmap.projects?.map((project, index) => (
            <div key={index} className="rounded-xl border border-[#E8EDF3] p-5">
              <h3 className="text-lg font-semibold text-[#1F2937]">
                {project.title}
              </h3>

              <p className="mt-1 text-sm font-medium text-[#23364D]">
                {project.difficulty}
              </p>

              <p className="mt-3 leading-7 text-[#6B7280]">
                {project.description}
              </p>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-[#1F2937]">
                  Tech Stack
                </h4>

                <div className="mt-2 flex flex-wrap gap-2">
                  {project.techStack?.map((tech, i) => (
                    <Badge key={i}>{tech}</Badge>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-[#6B7280]">
                <span className="font-semibold text-emerald-600">Resume Value: </span>
                {project.resumeValue}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Resources */}

      <Card className="p-6 sm:p-8">
        <SectionHeading icon={BookOpen} title="Learning Resources" />

        <div className="space-y-4">
          {roadmap.resources?.map((resource, index) => (
            <div key={index} className="rounded-xl border border-[#E8EDF3] p-4">
              <h3 className="font-semibold text-[#1F2937]">{resource.title}</h3>

              <p className="mt-1 text-sm font-medium text-[#23364D]">
                {resource.category}
              </p>

              <p className="mt-2 text-[#6B7280]">{resource.reason}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Interview Preparation */}

      <Card className="p-6 sm:p-8">
        <SectionHeading icon={Briefcase} title="Interview Preparation" />

        <p className="whitespace-pre-wrap leading-7 text-[#6B7280]">
          {roadmap.interviewPreparation}
        </p>
      </Card>

      {/* Common Mistakes */}

      <Card className="p-6 sm:p-8">
        <SectionHeading icon={AlertTriangle} title="Common Mistakes" tone="amber" />

        <ul className="list-disc space-y-2 pl-5 text-[#6B7280]">
          {roadmap.commonMistakes?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </Card>

      {/* Capstone Project */}

      <Card className="p-6 sm:p-8">
        <SectionHeading icon={Rocket} title="Capstone Portfolio Project" />

        <h3 className="text-lg font-semibold text-[#1F2937]">
          {roadmap.portfolioProject?.title}
        </h3>

        <p className="mt-3 leading-7 text-[#6B7280]">
          {roadmap.portfolioProject?.description}
        </p>
      </Card>

      {/* Final Checklist */}

      <Card className="p-6 sm:p-8">
        <SectionHeading icon={CheckCircle2} title="Final Checklist" tone="emerald" />

        <ul className="space-y-2.5">
          {roadmap.finalChecklist?.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-[#6B7280]">
              <CheckCircle2 size={18} className="mt-0.5 flex-none text-emerald-500" />
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default CareerSections;
