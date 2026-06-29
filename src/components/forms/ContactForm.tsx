import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { Send, CheckCircle, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import { submitContactForm } from '@/services/contact.service';
import type { ContactFormData } from '@/types';
import { cn } from '@/lib/utils';

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  company: yup.string().optional(),
  email: yup.string().required('Email is required').email('Enter a valid email'),
  phone: yup.string().optional(),
  country: yup.string().optional(),
  service: yup.string().optional(),
  budget: yup.string().optional(),
  message: yup.string().required('Message is required').min(20, 'Please provide more detail (at least 20 characters)'),
});

const services = [
  'Data Analytics',
  'Dashboard Development',
  'Business Intelligence',
  'Web Development',
  'Professional Training',
  'Multiple Services',
];

const countries = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'UAE', 'Singapore', 'Other',
];

const BUDGET_MIN = 10000;
const BUDGET_MAX = 500000;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [budget, setBudget] = useState(BUDGET_MIN);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    defaultValues: { budget: `$${BUDGET_MIN.toLocaleString()}` },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContactForm({ ...data, budget: `$${budget.toLocaleString()}` });
      setSubmitted(true);
      toast.success('Message sent! We\'ll be in touch within 24 hours.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send. Please try again.');
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-12 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-success-500/10 border border-success-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={36} className="text-success-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
        <p className="text-neutral-400 mb-6">
          Thank you for reaching out. Priyanshi will review your project details and get back to you
          within 24 hours.
        </p>
        <button
          onClick={() => {
            reset();
            setBudget(BUDGET_MIN);
            setSubmitted(false);
          }}
          className="btn-secondary text-sm"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-3xl p-8 space-y-6">
      {/* Free trial badge */}
      <div className="text-right">
        <span className="text-xs font-bold text-accent-400 uppercase tracking-widest">
          FREE TRIAL FOR 7 DAYS* – SECURED BY NDA
        </span>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">Name *</label>
          <input
            {...register('name')}
            placeholder="Your full name"
            className={cn('input-field', errors.name && 'ring-error-500/50 border-error-500/50')}
          />
          {errors.name && <p className="text-xs text-error-400 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">Email *</label>
          <input
            {...register('email')}
            type="email"
            placeholder="your@company.com"
            className={cn('input-field', errors.email && 'ring-error-500/50 border-error-500/50')}
          />
          {errors.email && <p className="text-xs text-error-400 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      {/* Company + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">Company</label>
          <input
            {...register('company')}
            placeholder="Your company name"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">Phone</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            className="input-field"
          />
        </div>
      </div>

      {/* Country + Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">Country</label>
          <select {...register('country')} className="input-field">
            <option value="">Select country</option>
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">Services</label>
          <select {...register('service')} className="input-field">
            <option value="">Select Services</option>
            {services.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Budget slider */}
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1.5">
          Project Budget
        </label>
        <div className="relative pt-2">
          {/* Budget display */}
          <div
            className="absolute -top-1 glass rounded-lg px-3 py-1 text-sm font-bold text-white border border-accent-500/30 transform -translate-x-1/2 pointer-events-none"
            style={{
              left: `${((budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100}%`,
            }}
          >
            ${budget.toLocaleString()}
          </div>
          <input
            type="range"
            min={BUDGET_MIN}
            max={BUDGET_MAX}
            step={5000}
            value={budget}
            onChange={e => {
              const val = parseInt(e.target.value);
              setBudget(val);
              setValue('budget', `$${val.toLocaleString()}`);
            }}
            className="w-full h-1.5 bg-navy-700 rounded-full appearance-none cursor-pointer mt-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-500 [&::-webkit-slider-thumb]:shadow-glow-sm [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <div className="flex justify-between text-xs text-neutral-500 mt-2">
            <span>$10,000</span>
            <span>$500,000</span>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1.5">
          Project Description *
        </label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Tell us about your project, your data challenges, and what outcomes you're looking for..."
          className={cn('input-field resize-none', errors.message && 'ring-error-500/50 border-error-500/50')}
        />
        {errors.message && <p className="text-xs text-error-400 mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center text-base py-4 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </button>

      <p className="text-xs text-neutral-500 text-center">
        Your information is secured by NDA. We respond within 24 hours.
      </p>
    </form>
  );
}
