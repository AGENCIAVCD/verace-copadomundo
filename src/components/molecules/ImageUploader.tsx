import { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export interface ImageUploaderProps {
    onImageUpload: (base64: string) => void;
    currentImage?: string;
    aspectRatio?: '16:9' | '1:1' | '4:3' | 'free';
    maxSizeMB?: number;
    placeholder?: string;
    className?: string;
}

export function ImageUploader({
    onImageUpload,
    currentImage,
    aspectRatio = 'free',
    maxSizeMB = 5,
    placeholder = 'Arraste uma imagem ou clique para escolher',
    className = '',
}: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string>('');

    const processImage = useCallback(async (file: File) => {
        setError('');
        setIsProcessing(true);

        try {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                throw new Error('Por favor, selecione uma imagem válida');
            }

            // Validate file size
            const sizeMB = file.size / (1024 * 1024);
            if (sizeMB > maxSizeMB) {
                throw new Error(`Imagem muito grande. Máximo: ${maxSizeMB}MB`);
            }

            // Convert to base64
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target?.result as string;
                onImageUpload(base64);
                setIsProcessing(false);
            };
            reader.onerror = () => {
                throw new Error('Erro ao processar imagem');
            };
            reader.readAsDataURL(file);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao processar imagem');
            setIsProcessing(false);
        }
    }, [maxSizeMB, onImageUpload]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            processImage(file);
        }
    }, [processImage]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processImage(file);
        }
    }, [processImage]);

    const handleRemove = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        onImageUpload('');
    }, [onImageUpload]);

    const aspectRatioClass = {
        '16:9': 'aspect-video',
        '1:1': 'aspect-square',
        '4:3': 'aspect-[4/3]',
        'free': 'min-h-48',
    }[aspectRatio];

    return (
        <div className={`relative ${className}`}>
            <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
            />

            {!currentImage ? (
                <label
                    htmlFor="image-upload"
                    className={`
                        ${aspectRatioClass}
                        flex flex-col items-center justify-center
                        border-2 border-dashed rounded-lg cursor-pointer
                        transition-all duration-200
                        ${isDragging
                            ? 'border-primary bg-primary/10 scale-[1.02]'
                            : 'border-border hover:border-primary/50 hover:bg-surface-light'
                        }
                        ${isProcessing ? 'opacity-50 cursor-wait' : ''}
                    `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {isProcessing ? (
                        <>
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3" />
                            <p className="text-sm text-text-secondary">Processando...</p>
                        </>
                    ) : (
                        <>
                            <Upload size={48} className="text-text-tertiary mb-3" />
                            <p className="text-sm font-medium text-text-primary mb-1">
                                {placeholder}
                            </p>
                            <p className="text-xs text-text-tertiary">
                                JPG, PNG, WEBP, SVG (máx. {maxSizeMB}MB)
                            </p>
                        </>
                    )}
                </label>
            ) : (
                <div className={`${aspectRatioClass} relative rounded-lg overflow-hidden group`}>
                    <img
                        src={currentImage}
                        alt="Upload preview"
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay com botões */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <label
                            htmlFor="image-upload"
                            className="px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition-colors flex items-center gap-2"
                        >
                            <ImageIcon size={16} />
                            Trocar
                        </label>
                        <button
                            onClick={handleRemove}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                        >
                            <X size={16} />
                            Remover
                        </button>
                    </div>
                </div>
            )}

            {error && (
                <p className="mt-2 text-xs text-red-500">{error}</p>
            )}
        </div>
    );
}
