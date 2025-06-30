export const ModalHelp = ({ dialog, onClose }: { dialog: boolean; onClose: () => void }) => {
  return (
    <dialog className="modal-help" open={dialog} onClick={onClose}>
      <div className="modal-header">
        <h3>Help</h3>
        <button type="button" onClick={onClose} aria-label="Close modal" className="close-button">
          <span>&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>Here you can find help and information about how to use the application.</p>
        {/* Add more help content here */}
      </div>
    </dialog>
  );
}