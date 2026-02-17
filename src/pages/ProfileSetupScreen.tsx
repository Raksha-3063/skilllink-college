import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Plus, Trash2, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const STEPS = ["Basic Info", "Bio & About", "Education", "Experience", "Skills & Services"];

const ProfileSetupScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  // Step 1
  const [fullName, setFullName] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");

  // Step 2
  const [bio, setBio] = useState("");
  const [about, setAbout] = useState("");

  // Step 3
  const [educations, setEducations] = useState([{ degree: "", specialization: "", college: "", startYear: "", endYear: "" }]);

  // Step 4
  const [experiences, setExperiences] = useState([{ role: "", company: "", duration: "", description: "" }]);

  // Step 5
  const [services, setServices] = useState([{ skill: "", description: "", price: "", category: "" }]);

  const progress = (step / 5) * 100;

  const completionPercent = () => {
    let filled = 0;
    let total = 12;
    if (fullName) filled++;
    if (college) filled++;
    if (course) filled++;
    if (year) filled++;
    if (bio) filled++;
    if (about) filled++;
    if (educations[0]?.degree) filled++;
    if (educations[0]?.college) filled++;
    if (experiences[0]?.role) filled++;
    if (experiences[0]?.company) filled++;
    if (services[0]?.skill) filled++;
    if (services[0]?.price) filled++;
    return Math.round((filled / total) * 100);
  };

  const handleProfilePic = () => {
    setProfilePic("https://i.pravatar.cc/150?img=1");
  };

  const addEducation = () => setEducations([...educations, { degree: "", specialization: "", college: "", startYear: "", endYear: "" }]);
  const removeEducation = (i: number) => educations.length > 1 && setEducations(educations.filter((_, idx) => idx !== i));
  const updateEducation = (i: number, field: string, value: string) => {
    const updated = [...educations];
    updated[i] = { ...updated[i], [field]: value };
    setEducations(updated);
  };

  const addExperience = () => setExperiences([...experiences, { role: "", company: "", duration: "", description: "" }]);
  const removeExperience = (i: number) => experiences.length > 1 && setExperiences(experiences.filter((_, idx) => idx !== i));
  const updateExperience = (i: number, field: string, value: string) => {
    const updated = [...experiences];
    updated[i] = { ...updated[i], [field]: value };
    setExperiences(updated);
  };

  const addService = () => setServices([...services, { skill: "", description: "", price: "", category: "" }]);
  const removeService = (i: number) => services.length > 1 && setServices(services.filter((_, idx) => idx !== i));
  const updateService = (i: number, field: string, value: string) => {
    const updated = [...services];
    updated[i] = { ...updated[i], [field]: value };
    setServices(updated);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-card px-5 pb-4 pt-6">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">Profile Setup</h1>
          <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
            {completionPercent()}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2 rounded-full" />
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">
            Step {step} of 5 — {STEPS[step - 1]}
          </p>
          <p className="text-xs text-muted-foreground">{Math.round(progress)}%</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="animate-fade-in">
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={handleProfilePic}
                  className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-muted transition-colors hover:border-primary"
                >
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <Camera size={28} className="text-muted-foreground" />
                  )}
                </button>
                <p className="text-xs text-muted-foreground">Tap to upload photo</p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Full Name</label>
                <Input placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-11 rounded-xl" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">College Name</label>
                <Input placeholder="IIT Delhi" value={college} onChange={(e) => setCollege(e.target.value)} className="h-11 rounded-xl" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Course</label>
                <Input placeholder="B.Tech Computer Science" value={course} onChange={(e) => setCourse(e.target.value)} className="h-11 rounded-xl" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Year</label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                    <SelectItem value="5th Year">5th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Short Bio</label>
                <Input
                  placeholder="UI/UX Designer & Frontend Developer"
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 100))}
                  className="h-11 rounded-xl"
                  maxLength={100}
                />
                <p className="mt-1 text-right text-xs text-muted-foreground">{bio.length}/100</p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">About Description</label>
                <Textarea
                  placeholder="Tell others about yourself, your skills, and what services you provide..."
                  value={about}
                  onChange={(e) => setAbout(e.target.value.slice(0, 300))}
                  className="min-h-[120px] rounded-xl"
                  maxLength={300}
                />
                <p className="mt-1 text-right text-xs text-muted-foreground">{about.length}/300</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              {educations.map((edu, i) => (
                <div key={i} className="relative rounded-xl border border-border bg-card p-4">
                  {educations.length > 1 && (
                    <button onClick={() => removeEducation(i)} className="absolute right-3 top-3 text-destructive">
                      <Trash2 size={16} />
                    </button>
                  )}
                  <p className="mb-3 text-sm font-semibold text-foreground">Education {i + 1}</p>
                  <div className="flex flex-col gap-3">
                    <Input placeholder="Degree (e.g. B.Tech)" value={edu.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} className="h-10 rounded-xl" />
                    <Input placeholder="Specialization" value={edu.specialization} onChange={(e) => updateEducation(i, "specialization", e.target.value)} className="h-10 rounded-xl" />
                    <Input placeholder="College Name" value={edu.college} onChange={(e) => updateEducation(i, "college", e.target.value)} className="h-10 rounded-xl" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="Start Year" value={edu.startYear} onChange={(e) => updateEducation(i, "startYear", e.target.value)} className="h-10 rounded-xl" />
                      <Input placeholder="End Year" value={edu.endYear} onChange={(e) => updateEducation(i, "endYear", e.target.value)} className="h-10 rounded-xl" />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addEducation} className="gap-2 rounded-xl">
                <Plus size={16} /> Add More Education
              </Button>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-muted-foreground">This step is optional. You can skip if you don't have experience yet.</p>
              {experiences.map((exp, i) => (
                <div key={i} className="relative rounded-xl border border-border bg-card p-4">
                  {experiences.length > 1 && (
                    <button onClick={() => removeExperience(i)} className="absolute right-3 top-3 text-destructive">
                      <Trash2 size={16} />
                    </button>
                  )}
                  <p className="mb-3 text-sm font-semibold text-foreground">Experience {i + 1}</p>
                  <div className="flex flex-col gap-3">
                    <Input placeholder="Role / Internship Title" value={exp.role} onChange={(e) => updateExperience(i, "role", e.target.value)} className="h-10 rounded-xl" />
                    <Input placeholder="Company Name" value={exp.company} onChange={(e) => updateExperience(i, "company", e.target.value)} className="h-10 rounded-xl" />
                    <Input placeholder="Duration (e.g. May 2024 - Jul 2024)" value={exp.duration} onChange={(e) => updateExperience(i, "duration", e.target.value)} className="h-10 rounded-xl" />
                    <Textarea placeholder="Brief description..." value={exp.description} onChange={(e) => updateExperience(i, "description", e.target.value)} className="min-h-[80px] rounded-xl" />
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addExperience} className="gap-2 rounded-xl">
                <Plus size={16} /> Add More Experience
              </Button>
            </div>
          )}

          {step === 5 && (
            <div className="flex flex-col gap-4">
              {services.map((svc, i) => (
                <div key={i} className="relative rounded-xl border border-border bg-card p-4">
                  {services.length > 1 && (
                    <button onClick={() => removeService(i)} className="absolute right-3 top-3 text-destructive">
                      <Trash2 size={16} />
                    </button>
                  )}
                  <p className="mb-3 text-sm font-semibold text-foreground">Service {i + 1}</p>
                  <div className="flex flex-col gap-3">
                    <Input placeholder="Skill Name (e.g. UI Design)" value={svc.skill} onChange={(e) => updateService(i, "skill", e.target.value)} className="h-10 rounded-xl" />
                    <Textarea placeholder="Service description..." value={svc.description} onChange={(e) => updateService(i, "description", e.target.value)} className="min-h-[70px] rounded-xl" />
                    <Input placeholder="Price (₹)" value={svc.price} onChange={(e) => updateService(i, "price", e.target.value)} className="h-10 rounded-xl" type="number" />
                    <Select value={svc.category} onValueChange={(v) => updateService(i, "category", v)}>
                      <SelectTrigger className="h-10 rounded-xl">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Notes">Notes</SelectItem>
                        <SelectItem value="Tutoring">Tutoring</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Coding">Coding</SelectItem>
                        <SelectItem value="PPT">PPT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addService} className="gap-2 rounded-xl">
                <Plus size={16} /> Add More Services
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="sticky bottom-0 border-t border-border bg-card px-5 py-4 safe-bottom">
        <div className="flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="h-12 flex-1 gap-2 rounded-xl">
              <ChevronLeft size={18} /> Back
            </Button>
          )}
          {step < 5 ? (
            <Button onClick={() => setStep(step + 1)} className="h-12 flex-1 gap-2 rounded-xl text-base font-semibold">
              Continue <ChevronRight size={18} />
            </Button>
          ) : (
            <Button onClick={() => navigate("/home")} className="h-12 flex-1 gap-2 rounded-xl text-base font-semibold">
              <Check size={18} /> Finish Setup
            </Button>
          )}
          {step === 4 && (
            <Button variant="ghost" onClick={() => setStep(5)} className="h-12 rounded-xl text-sm text-muted-foreground">
              Skip
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupScreen;
