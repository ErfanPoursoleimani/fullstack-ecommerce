'use client'

import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import {
  useParams,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { FaArrowRight } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from '@/app/stores/authStore'
import useDataStore from '@/app/stores/dataStore'
import { useReturnUrl } from '@/app/hooks/useReturnUrl'

const verifySchema = z.object({
  code: z
    .string()
    .length(6)
    .regex(/^\d+$/),
})

type VerifyData = z.infer<
  typeof verifySchema
>

const OTP_LENGTH = 6
const RESEND_TIME = 120

export default function VerifyForm() {

  const router = useRouter()

  const searchParams =
    useSearchParams()

  const targetFromUrl =
    searchParams.get('target')

  const {
    verificationTarget,
    verifyOtp,
    setVerificationTarget,
    isAuthenticated,
  } = useAuthStore()

  const { initializeStore, lang } = useDataStore()

  const { redirectToReturnUrl } = useReturnUrl()

  const target =
    targetFromUrl ??
    verificationTarget

  const [timer, setTimer] =
    useState(RESEND_TIME)

  const [digits, setDigits] =
    useState<string[]>(
      Array(OTP_LENGTH).fill('')
    )

  const inputsRef = useRef<
    (HTMLInputElement | null)[]
  >([])

  const {
    setValue,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<VerifyData>({
    resolver: zodResolver(
      verifySchema
    ),
  })

  useEffect(() => {
    if (!target) {
      router.replace(
        `/${lang}/auth/login`
      )
    }
  }, [target])

  useEffect(() => {
    if (
      targetFromUrl &&
      !verificationTarget
    ) {
      setVerificationTarget(
        targetFromUrl
      )
    }
  }, [])

  useEffect(() => {
    if (!timer) return

    const interval = setInterval(
      () => {
        setTimer((prev) => prev - 1)
      },
      1000
    )

    return () =>
      clearInterval(interval)
  }, [timer])

  const submit = async (
    data: VerifyData
  ) => {
    try {
      await verifyOtp(
        data.code,
        lang as string
      )

      await initializeStore(lang, isAuthenticated)

      redirectToReturnUrl()
    } catch {
      setError('code', {
        message:
          'کد وارد شده صحیح نیست',
      })
    }
  }

  const updateCode = (
    values: string[]
  ) => {
    setDigits(values)

    const code =
      values.join('')

    setValue('code', code)

    if (
      code.length ===
        OTP_LENGTH &&
      !values.includes('')
    ) {
      handleSubmit(submit)()
    }
  }

  const resendCode = async () => {
    try {
      await axios.post(
        `/api/${lang}/auth/resend`
      )

      setTimer(RESEND_TIME)
    } catch {}
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f6f6f6]">
      <div className="w-full max-w-[400px] rounded-[7px] border bg-white p-8">
        <div className="flex justify-end mb-8">
          <button
            onClick={() =>
              router.back()
            }
          >
            <FaArrowRight />
          </button>
        </div>

        <h1 className="text-center text-3xl font-medium mb-10">
          SoleymaniRice
        </h1>

        <div className="text-center mb-8">
          <h2 className="font-medium mb-2">
            تایید کد ورود
          </h2>

          <p className="text-sm text-gray-500">
            کد تایید به
          </p>

          <p className="font-medium mt-1">
            {target}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(
            submit
          )}
          className="space-y-6"
        >
          <div className="flex justify-center gap-2">
            {digits.map(
              (digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[
                      index
                    ] = el
                  }}
                  value={digit}
                  maxLength={1}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  onChange={(e) => {
                    const val =
                      e.target.value.replace(
                        /\D/g,
                        ''
                      )

                    const copy = [
                      ...digits,
                    ]

                    copy[index] =
                      val

                    updateCode(copy)

                    if (
                      val &&
                      index <
                        OTP_LENGTH - 1
                    ) {
                      inputsRef.current[
                        index + 1
                      ]?.focus()
                    }
                  }}
                  className="w-12 h-14 rounded-lg border text-center text-lg font-semibold outline-none focus:border-[#00adcc]"
                />
              )
            )}
          </div>

          {errors.code && (
            <p className="text-center text-red-600 text-sm">
              {
                errors.code
                  .message
              }
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-13 bg-[var(--theme)] text-white rounded-[7px]"
          >
            {isSubmitting
              ? 'در حال تایید...'
              : 'تایید کد'}
          </button>
        </form>

        <div className="text-center mt-6">
          {timer > 0 ? (
            <span className="text-sm text-gray-500">
              ارسال مجدد تا{' '}
              {Math.floor(
                timer / 60
              )}
              :
              {String(
                timer % 60
              ).padStart(2, '0')}
            </span>
          ) : (
            <button
              onClick={
                resendCode
              }
              className="text-[var(--theme)]"
            >
              ارسال مجدد کد
            </button>
          )}
        </div>
      </div>
    </div>
  )
}