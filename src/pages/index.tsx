import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
 
export const getServerSideProps: GetServerSideProps<{
  text: string
}> = async () => {
  return { props: { text: "Hello World!" } }
}
 
export default function Page({
  text,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>
    {text}
  </div>
}