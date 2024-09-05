import { useState } from 'react';
import './Share.scss'

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    onShare: (listName: string) => Promise<string>;
    shareLink: string | null;
}

export default function ShareModal({ isOpen, onClose, onShare, shareLink }: ShareModalProps) {
    const [listName, setListName] = useState('');

    const handleSubmit = async () => {
        if (listName.trim() === '') { // Verificar se o nome da lista está vazio
            alert('Please enter a list name.');
            return;
        }
        await onShare(listName);
        setListName('');
    };

    const handleCopyLink = () => {
        if (shareLink) {
            navigator.clipboard.writeText(shareLink)
                .then(() => {
                    alert('Link copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy link: ', err);
                });
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Compartilhe sua lista</h2>
                <label
                    htmlFor="listName">Nome da lista </label>
                <input
                    className='input-list-name'
                    type="text"
                    id="listName"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                />
                <button onClick={handleSubmit}>Gerar link</button>
                <button onClick={onClose}>Cancelar</button>

                {shareLink && (
                    <div>
                        <input className='input-generated-link' type="text" value={shareLink} readOnly />
                        <button onClick={handleCopyLink}>Copiar</button>
                    </div>
                )}
            </div>
        </div>
    );
};