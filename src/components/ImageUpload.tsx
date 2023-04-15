import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

export default function ImageUpload({
  onChange,
  label,
  value,
  disabled,
}: Props) {
  //? Base64 image를 DB에 저장하는 것은 좋지 않다. (서버 부하도 있지만 이미지 불러올 때 너무 느림)
  //? 이미지를 Storage에 저장하고, 그 URL을 DB에 저장하는 것이 좋다.

  const [base64, setBase64] = useState(value || '');

  const handleChange = useCallback((base64: string) => {
    // onChange(base64);
    console.log('### 이미지 업로드 기능 차단 [작동은 됨] ㅎㅎㅎ');
  }, []);

  const handleDrop = useCallback(
    (files: File[]) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange],
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700',
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
}
