import { createSandbox} from "@es-js/sandbox"
import {useShare} from "./useShare.ts"

const share = useShare()

const options = share.getOptionsFromUrl()

createSandbox('esjs-sandbox', {
  theme: options.theme,
  hidePreview: options.hidePreview,
  previewTab: options.previewTab,
  code: share.getCodeFromUrl(),
  testsCode: share.getTestsCodeFromUrl()
})
