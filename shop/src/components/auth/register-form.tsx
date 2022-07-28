import { useState } from 'react';
import { useRouter } from 'next/router';
import type { SubmitHandler } from 'react-hook-form';
import Logo from '@/components/ui/logo';
import Input from '@/components/ui/forms/input';
import PasswordInput from '@/components/ui/forms/password-input';
import Button from '@/components/ui/button';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { Form } from '@/components/ui/forms/form';
import type {
  ForgotPasswordUserInput,
  ResetPasswordUserInput,
  VerifyForgotPasswordUserInput,
  RegisterUserInput,
} from '@/types';
import * as yup from 'yup';
import { useRegister, useOtpLogin } from '@/framework/user';
import Select from '../ui/select/select';

import { ArrowPrevIcon } from '../icons/arrow-prev';
import { ArrowNextIcon } from '../icons/arrow-next';

const registerFormSchema = yup.object().shape({
  fullname: yup.string().required('Full name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().required().oneOf([yup.ref('password')], "Password mismatch"),
  username: yup.string().required().min(4, "Username too short"),
  country:  yup.string().required()
});


const tokenFormValidation = yup.object().shape({
  token: yup.string().required('You must provide a token'),
});

function RegisterForm(props: any) {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  // const { mutate, isLoading, formError } = useRegister();
  const [register, setRegister] = useState({})

  const { mutate, isLoading, formError } = props;


  function updateFields(event:any) {
    const { name, value } = event.target;
    const data = {...register, [name]: value}
    setRegister(data);
  }

  function onSubmit(event: RegisterUserInput) {
    mutate({...register});
  }

  return (
    <>
      <Form<RegisterUserInput>
        onSubmit={() => {}}
        validationSchema={registerFormSchema}
        serverError={formError}
      >
        {({ register, formState: { errors } }) => (
          <>
            <Input
              label={t('Full Name')}
              {...register('fullname')}
              onChange={updateFields}
              variant="outline"
              className="mb-5"
              error={t(errors.fullName?.message!)}
              />
            <Input
              label={t('Username')}
              {...register('username')}
              onChange={updateFields}
              variant="outline"
              className="mb-5"
              error={t(errors.username?.message!)}
              />
            <Input
              label={t('text-email')}
              {...register('email')}
              onChange={updateFields}
              type="email"
              variant="outline"
              className="mb-5"
              error={t(errors.email?.message!)}
              />


              <Select 
                {...register('country')}
                onChange={(e) => {
                  const event = {}
                  event.target = {
                      name: 'country',
                      value: e.value
                    }
                  updateFields(event)
                }}
                options={[
                  { value: 'chocolate', label: 'Chocolate' },
                  { value: 'strawberry', label: 'Strawberry' },
                  { value: 'vanilla', label: 'Vanilla' },
                ]}
              />
            
            <PasswordInput
              label={t('text-password')}
              {...register('password')}
              onChange={updateFields}
              error={t(errors.password?.message!)}
              variant="outline"
              className="mb-5"
              />
            <PasswordInput
              label={t('Confirm password')}
              {...register('confirmPassword')}
              onChange={updateFields}
              error={t(errors.confirmPassword?.message!)}
              variant="outline"
              className="mb-5"
            />
            <div className="mt-8">
              <Button
                className="h-12 w-full"
                loading={isLoading}
                disabled={isLoading}
                onClick={onSubmit}
              >
                {t('text-register')}
              </Button>
            </div>
          </>
        )}
      </Form>
      {/* End of forgot register form */}

      <div className="relative mt-8 mb-6 flex flex-col items-center justify-center text-sm text-heading sm:mt-11 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute -top-2.5 bg-light px-2 ltr:left-2/4 ltr:-ml-4 rtl:right-2/4 rtl:-mr-4">
          {t('text-or')}
        </span>
      </div>
      <div className="text-center text-sm text-body sm:text-base">
        {t('text-already-account')}{' '}
        <button
          onClick={() => openModal('LOGIN_VIEW')}
          className="font-semibold text-accent underline transition-colors duration-200 hover:text-accent-hover hover:no-underline focus:text-accent-hover focus:no-underline focus:outline-none ltr:ml-1 rtl:mr-1"
        >
          {t('text-login')}
        </button>
      </div>
    </>
  );
}

export default function RegisterView() {
  const [select, setSelect] = useState('register');
  const { mutate, isLoading, formError } = useRegister(setSelect);
  
  const { t } = useTranslation('common');
  const router = useRouter();
  const { closeModal } = useModalAction();
  function handleNavigate(path: string) {
    router.push(`/${path}`);
    closeModal();
  }

  const page = {
    register: <RegisterForm 
      mutate={mutate}
      formError={formError}
      isLoading={isLoading}
    />,
    token: <TokenForm 
      token=''
      onSubmit={() => {}}
      isLoading={false}
      serverError=""
    />
  }

  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="mt-4 mb-7 px-2 text-center text-sm leading-relaxed text-body sm:mt-5 sm:mb-10 sm:px-0 md:text-base">
        {t('registration-helper')}
        <span
          onClick={() => handleNavigate('terms')}
          className="mx-1 cursor-pointer text-accent underline hover:no-underline"
        >
          {t('text-terms')}
        </span>
        &
        <span
          onClick={() => handleNavigate('privacy')}
          className="cursor-pointer text-accent underline hover:no-underline ltr:ml-1 rtl:mr-1"
        >
          {t('text-policy')}
        </span>
      </p>
      {
        page[select]
      }
    </div>
  );
}





function TokenForm({
  // token,
  // onSubmit,
  // isLoading,
  // serverError,
  // handlePrevStep,
}: {
  token: string;
  onSubmit: SubmitHandler<Pick<VerifyForgotPasswordUserInput, 'token'>>;
  isLoading: boolean;
  serverError: any;
  // handlePrevStep: () => void;
}) {
  const { t } = useTranslation('common');
  const [token2, setToken] = useState('');
  const { mutate, isLoading, serverError } = useOtpLogin()

  function onSubmit(params:any) {
    console.log(params)
    mutate(params);
  }
  return (
    <Form<Pick<VerifyForgotPasswordUserInput, 'token'>>
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: { token: token2 },
      }}
      validationSchema={tokenFormValidation}
      serverError={serverError}
    >
      {({ register, formState: { errors } }) => (
        <>
          <Input
            label={t('token-label')}
            {...register('token')}
            onChange={e => setToken(e.target.value)}
            error={t(errors.token?.message!)}
            style={{ marginBottom: '1rem'}}
            />
          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
            <Button
              className="w-full text-sm tracking-[0.2px] sm:order-2"
              loading={isLoading}
              disabled={isLoading}
            >
              {t('text-submit-token')}
              {/* <ArrowNextIcon className="w-5" /> */}
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
