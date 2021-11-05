import { IEvents } from '@flatfile/sdk';

export type InitParams = IEvents['init'];
export type UploadParams = IEvents['upload'];
export type ErrorParams = IEvents['error'];
export type LaunchParams = IEvents['launch'];
export type CompleteParams = IEvents['complete'];
export type CloseParams = IEvents['close'];

export interface FlatfileMethods {
  onInit?: (params: InitParams) => void;
  onUpload?: (params: UploadParams) => void;
  onError?: (params: ErrorParams) => void;
  onLaunch?: (params: LaunchParams) => void;
  onComplete?: (params: CompleteParams) => void;
  onClose?: () => void;
}
