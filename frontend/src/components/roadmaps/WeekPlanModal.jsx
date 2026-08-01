import Modal from "../common/Modal";
import Card from "../common/Card";

function WeekPlanModal({ open, onClose, weekPlan }) {
  if (!weekPlan) return null;

  return (
    <Modal open={open} onClose={onClose} title={`Week ${weekPlan.week} Study Plan`} size="xl">
      <p className="mb-6 text-[#6B7280]">{weekPlan.overview}</p>

      <div className="space-y-5">
        {weekPlan.days.map((day, index) => (
          <Card key={index} className="p-5">
            <h3 className="text-lg font-semibold text-[#1F2937]">{day.day}</h3>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-[#23364D]">Study Topics</h4>

              <ul className="mt-2 list-disc space-y-1 pl-5 text-[#6B7280]">
                {day.studyTopics.map((topic, i) => (
                  <li key={i}>{topic}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-[#23364D]">Practice</h4>

              <ul className="mt-2 list-disc space-y-1 pl-5 text-[#6B7280]">
                {day.practice.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-[#23364D]">Assignment</h4>
              <p className="mt-2 text-[#6B7280]">{day.assignment}</p>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-[#23364D]">Estimated Hours</h4>
              <p className="mt-2 text-[#6B7280]">{day.estimatedHours}</p>
            </div>
          </Card>
        ))}
      </div>
    </Modal>
  );
}

export default WeekPlanModal;
