import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/20/solid';

const tiers = [
  {
    name: 'Free',
    id: 'tier-free',
    href: '#',
    price: { monthly: '$0', annually: '$0' },
    description: 'Perfect for trying out GenTest.',
    features: [
      'Generate up to 10 test cases per day',
      'Support for Python and JavaScript',
      'Basic test coverage',
      'Community support',
    ],
    mostPopular: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '#',
    price: { monthly: '$15', annually: '$144' },
    description: 'For individual developers and small teams.',
    features: [
      'Generate unlimited test cases',
      'Support for all languages',
      'Advanced test coverage',
      'Priority email support',
      'API access',
      'Custom test templates',
    ],
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    price: { monthly: 'Custom', annually: 'Custom' },
    description: 'For organizations with specific needs.',
    features: [
      'Everything in Pro',
      'Dedicated support',
      'Custom integrations',
      'SSO authentication',
      'Advanced security features',
      'SLA guarantees',
      'On-premise deployment options',
    ],
    mostPopular: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Pricing() {
  const [frequency, setFrequency] = useState('monthly');

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing plans for teams of&nbsp;all&nbsp;sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Choose the perfect plan for your needs. All plans include a 14-day free trial.
        </p>
        
        <div className="mt-16 flex justify-center">
          <div className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200">
            <button
              className={classNames(
                frequency === 'monthly' ? 'bg-indigo-600 text-white' : 'text-gray-500',
                'cursor-pointer rounded-full px-2.5 py-1'
              )}
              onClick={() => setFrequency('monthly')}
            >
              Monthly
            </button>
            <button
              className={classNames(
                frequency === 'annually' ? 'bg-indigo-600 text-white' : 'text-gray-500',
                'cursor-pointer rounded-full px-2.5 py-1'
              )}
              onClick={() => setFrequency('annually')}
            >
              Annually
            </button>
          </div>
        </div>
        
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200',
                'rounded-3xl p-8'
              )}
            >
              <h3
                id={tier.id}
                className={classNames(
                  tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                  'text-lg font-semibold leading-8'
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price[frequency]}</span>
                {tier.name !== 'Enterprise' && (
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    {frequency === 'monthly' ? '/month' : '/year'}
                  </span>
                )}
              </p>
              <Link
                to={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                    : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                  'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                {tier.name === 'Free' ? 'Sign up' : 'Buy plan'}
              </Link>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 