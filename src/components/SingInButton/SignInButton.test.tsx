import { render, screen } from "@testing-library/react"
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/client'
import SignInButton from "."

jest.mock('next-auth/client')

describe("SignInButton component", () => {
  it('renders correctly when user is not authenticated', () => {

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SignInButton />)

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })


  it('renders correctly when user is authenticated', () => {

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([{
      user: {
        name: 'Theodore Murray',
        email: 'theodore@murray.com'
      },
      expires: 'fake-expires'
    }, false])

    render(<SignInButton />)

    expect(screen.getByText('Theodore Murray')).toBeInTheDocument()
  })
})
