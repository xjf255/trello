import { useDispatch, useSelector } from "react-redux"
import { IComment, ICreateBoard, Id, IStateActions } from "../types"
import { createBoard, removeBoard, updateBoard } from "../context/Dashboard/sliceBoard"

export const useBoardActions = () => {
  const dispatch = useDispatch()
  const board = useSelector((state: IStateActions) => state.board)

  const createNewBoard = (newBoard: ICreateBoard) => {
    dispatch(createBoard(newBoard))
  }

  const removeBoards = (id: Id) => {
    dispatch(removeBoard(id))
  }

  const getBoard = (boardId: Id) => {
    if (!board) return
    return board.find((board) => board.id === boardId)
  }

  const addComment = (boardId: Id, comment: IComment) => {
    const currentBoard = getBoard(boardId)
    if (currentBoard) {
      const updatedBoard = { ...currentBoard, comments: [...currentBoard.comments, { commentId: crypto.randomUUID(), ...comment }] }
      dispatch(updateBoard(updatedBoard))
    }
  }

  const toogleLike = (boardId: Id, userId: Id) => {
    const currentBoard = getBoard(boardId)
    if (currentBoard) {
      const updatedBoard = { ...currentBoard, likes: currentBoard.likes.includes(userId) ? currentBoard.likes.filter((user) => user !== userId) : [...currentBoard.likes, userId] }
      dispatch(updateBoard(updatedBoard))
    }
  }

  return { board, createNewBoard, removeBoards, addComment, toogleLike }
}