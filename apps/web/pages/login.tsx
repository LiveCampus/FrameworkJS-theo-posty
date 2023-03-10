import Head from 'next/head'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import Navbar from '../components/Navbar/Navbar'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ServerResponse } from '../types/types'
import { useAuth } from '../context/AuthContext'
import clsx from 'clsx'
import Router from 'next/router'

const validationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Must be a valid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})

type ValidationSchema = z.infer<typeof validationSchema>

export default function Home() {
  const [serverResponse, setServerResponse] = useState<ServerResponse>()
  const [error, setError] = useState('')
  const [valid, setValid] = useState(false)

  const { login, authUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: data.email,
        password: data.password,
      })
      .then((d) => setServerResponse(d.data))
      .catch((e) => setServerResponse(e.response.data))
  }

  useEffect(() => {
    if (!serverResponse) return

    if (serverResponse.error) {
      setError(serverResponse.error)
    } else {
      setError('')
      login(serverResponse.data)
    }
  }, [serverResponse])

  useEffect(() => {
    if (!authUser) return

    setValid(true)
    setTimeout(() => {
      Router.push('/')
      setValid(false)
    }, 2000)
  }, [authUser])

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container">
        <article className="grid">
          <div>
            <hgroup>
              <h1>Login</h1>
              <h2>Login to your account to order some of our products</h2>
            </hgroup>

            <form onSubmit={handleSubmit(onSubmit)}>
              {error && <p className="error">Error: {error}</p>}
              <input
                type="text"
                placeholder="Email"
                aria-label="Email"
                aria-invalid={errors.email ? true : undefined}
                autoComplete="nickname"
                disabled={valid}
                required
                {...register('email')}
              />
              {errors.email && <small className="error">{errors.email.message}</small>}
              <input
                type="password"
                placeholder="Password"
                aria-label="Password"
                aria-invalid={errors.password ? true : undefined}
                autoComplete="current-password"
                disabled={valid}
                required
                {...register('password')}
              />
              {errors.password && <small className="error">{errors.password.message}</small>}
              <fieldset>
                <Link
                  className="contrast"
                  aria-disabled={valid}
                  data-tooltip="Login"
                  role="link"
                  href={clsx(!valid && '/register')}
                >
                  Don't have an account ?
                </Link>
              </fieldset>

              <button type="submit" className={clsx(!valid && 'contrast')} aria-busy={valid}>
                Login
              </button>
            </form>
          </div>
        </article>
      </main>
    </>
  )
}
