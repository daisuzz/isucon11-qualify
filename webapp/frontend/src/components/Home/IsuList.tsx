import { useEffect, useState } from 'react'
import apis, { GetIsuListResponse } from '/@/lib/apis'
import { getConditionTime } from '/@/lib/date'
import IsuImage from '/@/components/UI/IsuImage'
import Tip from '/@/components/UI/Tip'
import { Link } from 'react-router-dom'

const LIMIT = 4

const Isus = () => {
  const [isus, setIsus] = useState<GetIsuListResponse[]>([])
  useEffect(() => {
    const fetchIsus = async () => {
      setIsus(await apis.getIsus({ limit: LIMIT }))
    }
    fetchIsus()
  }, [setIsus])

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">MyISU List</h2>
      <div className="grid-cols-list grid gap-8 w-full">
        {isus.map(isu => (
          <Link
            key={isu.jia_isu_uuid}
            to={`/isu/${isu.jia_isu_uuid}`}
            className="hover:bg-primary flex flex-col items-center p-4 rounded"
          >
            <IsuImage isu={isu} customClass="h-48 w-48" />
            <h3 className="text-primary mb-3 mt-2 font-medium">{isu.name}</h3>
            {isu.latest_isu_condition ? (
              <div>
                <Tip variant={isu.latest_isu_condition.condition_level} />
                <div className="text-secondary mt-1">
                  {getConditionTime(isu.latest_isu_condition.date)}
                </div>
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Isus
