package linker.infra.board

import linker.domain.board.Board
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 25/05/2018
 * Time: 9:20 PM
 */
@Repository
interface BoardRepository : JpaRepository<Board, Long>