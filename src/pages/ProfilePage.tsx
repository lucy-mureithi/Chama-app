import { useAuth } from '../hooks/useAuth'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export const ProfilePage = () => {
  const { user, logout } = useAuth()

  return (
    <div>
      <h1>My Profile</h1>
      <Card>
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Phone:</strong> {user?.phone || 'Not provided'}
        </p>
      </Card>
      <Button variant="danger" onClick={logout}>
        Logout
      </Button>
    </div>
  )
}
