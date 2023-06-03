import { Players } from '@/types/player'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group, Quaternion, Vector3 } from 'three'

type PlayerProps = {
  players: Players
  mainPlayerId: string
}

const nextPosition = new Vector3()
const nextQuaternion = new Quaternion()

export default function Player(props: PlayerProps) {
  return (
    <>
      {Object.values(props.players).map((player) => (
        <>
          {player.id !== props.mainPlayerId && (
            <Other key={player.id} position={player.position} quaternion={player.quaternion} />
          )}
        </>
      ))}
    </>
  )
}

type OtherProps = {
  position: Players['id']['position']
  quaternion: Players['id']['quaternion']
}

function Other(props: OtherProps) {
  const playerRef = useRef<Group>(null)

  useFrame(() => {
    if (playerRef.current) {
      nextPosition.fromArray([props.position.x, props.position.y, props.position.z])
      nextQuaternion.fromArray([props.quaternion.x, props.quaternion.y, props.quaternion.z, props.quaternion.w])
      playerRef.current.position.lerp(nextPosition, 0.3)
      playerRef.current.quaternion.rotateTowards(nextQuaternion, 0.4)
    }
  })

  return (
    <group ref={playerRef}>
      <mesh>
        <boxGeometry args={[2, 4, 2]} />
        <meshStandardMaterial color='yellow' />
      </mesh>
    </group>
  )
}
