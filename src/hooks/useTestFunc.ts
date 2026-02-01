import useAppData from "./useAppData";

const useTestFunc = () => {
  const {
    setCount,
  } = useAppData()

  const handleTest = () => {
    setCount(123)
  }

  const returnValues = {
    handleTest,
  }
  return returnValues
}
export default useTestFunc