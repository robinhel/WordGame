import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import StartPage from '../StartPage'

const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
    return {
        ...actual,
        useNavigate: () => navigateMock
    }
})

describe('StartPage', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
        navigateMock.mockReset()
    })

    it('disables both start buttons until username has at least 2 characters', () => {
        render(
            <MemoryRouter>
                <StartPage />
            </MemoryRouter>
        )

        const createButton = screen.getByRole('button', { name: 'SKAPA SPEL' })
        const joinButton = screen.getByRole('button', { name: 'GÅ MED I SPEL' })
        const nameInput = screen.getByPlaceholderText('Skriv in ditt namn...')

        expect(createButton).toBeDisabled()
        expect(joinButton).toBeDisabled()

        fireEvent.change(nameInput, { target: { value: 'Ro' } })

        expect(createButton).toBeEnabled()
        expect(joinButton).toBeEnabled()
    })

    it('shows join room input after clicking GÅ MED I SPEL', () => {
        render(
            <MemoryRouter>
                <StartPage />
            </MemoryRouter>
        )

        fireEvent.change(screen.getByPlaceholderText('Skriv in ditt namn...'), {
            target: { value: 'Robin' }
        })

        fireEvent.click(screen.getByRole('button', { name: 'GÅ MED I SPEL' }))

        expect(screen.getByPlaceholderText('Ange rumskod...')).toBeVisible()
        expect(screen.getByRole('button', { name: 'ANSLUT NU' })).toBeDisabled()
    })

    it('shows validation error when trying to join with room code shorter than 6 chars', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: false
        } as Response)

        render(
            <MemoryRouter>
                <StartPage />
            </MemoryRouter>
        )

        fireEvent.change(screen.getByPlaceholderText('Skriv in ditt namn...'), {
            target: { value: 'Robin' }
        })
        fireEvent.click(screen.getByRole('button', { name: 'GÅ MED I SPEL' }))

        fireEvent.change(screen.getByPlaceholderText('Ange rumskod...'), {
            target: { value: 'ABCD12' }
        })
        fireEvent.click(screen.getByRole('button', { name: 'ANSLUT NU' }))

        expect(await screen.findByText('Hittade inget spel med den angivna koden.')).toBeVisible()
        expect(navigateMock).not.toHaveBeenCalled()
    })

    it('creates game, joins as host and navigates to host lobby', async () => {
        const fetchMock = vi.spyOn(globalThis, 'fetch')
        fetchMock
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: 'ABC123' })
            } as Response)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({})
            } as Response)

        render(
            <MemoryRouter>
                <StartPage />
            </MemoryRouter>
        )

        fireEvent.change(screen.getByPlaceholderText('Skriv in ditt namn...'), {
            target: { value: 'Robin' }
        })
        fireEvent.click(screen.getByRole('button', { name: 'SKAPA SPEL' }))

        await waitFor(() => {
            expect(fetchMock).toHaveBeenNthCalledWith(1, '/api/create', { method: 'POST' })
            expect(fetchMock).toHaveBeenNthCalledWith(2, '/api/Join/ABC123?name=Robin', { method: 'POST' })
            expect(navigateMock).toHaveBeenCalledWith('/create-game/ABC123', {
                state: { username: 'Robin' }
            })
        })
    })

    it('joins existing game with uppercased room code and navigates as guest', async () => {
        const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true
        } as Response)

        render(
            <MemoryRouter>
                <StartPage />
            </MemoryRouter>
        )

        fireEvent.change(screen.getByPlaceholderText('Skriv in ditt namn...'), {
            target: { value: 'Robin' }
        })
        fireEvent.click(screen.getByRole('button', { name: 'GÅ MED I SPEL' }))
        fireEvent.change(screen.getByPlaceholderText('Ange rumskod...'), {
            target: { value: 'ab12cd' }
        })
        fireEvent.click(screen.getByRole('button', { name: 'ANSLUT NU' }))

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledWith('/api/Join/AB12CD?name=Robin', {
                method: 'POST'
            })
            expect(navigateMock).toHaveBeenCalledWith('/join-game/AB12CD', {
                state: { username: 'Robin' }
            })
        })
    })
})