import { createQuote } from "@lib/data/quotes"
import { XCircle } from "@medusajs/icons"
import { Button } from "@medusajs/ui"
import * as Dialog from "@radix-ui/react-dialog"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

export const RequestQuoteConfirmation = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [requesting, setRequesting] = useState(false)
  const { countryCode } = useParams()
  const router = useRouter()

  const handleCreateQuoteRequest = async () => {
    setRequesting(true)

    try {
      await createQuote()
    } catch {
      setRequesting(false)
    }

    try {
      const { quote } = await createQuote()

      router.push(`/${countryCode}/account/quotes/details/${quote.id}`)
    } catch (error) {
      setRequesting(false)
    } finally {
      setRequesting(false)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-[75]" />
        <Dialog.Content className="z-[100] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-xl mb-6">
            Submit request for quote
          </Dialog.Title>

          <div className="flex flex-col gap-y-4">
            <p>
              You are about to request a quote for the cart. If you confirm, the
              cart will be converted to a quote.
            </p>
          </div>

          <div className="mt-[25px] flex justify-end gap-x-2">
            <Dialog.Close asChild>
              <Button variant="secondary" disabled={requesting}>
                Cancel
              </Button>
            </Dialog.Close>

            <Button onClick={handleCreateQuoteRequest} isLoading={requesting}>
              Submit
            </Button>
          </div>

          <Dialog.Close asChild>
            <XCircle className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] outline-none cursor-pointer" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}