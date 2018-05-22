package linker.repository

import linker.entity.Category
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:38 PM
 */
@Repository
interface CategoryRepository : JpaRepository<Category, Long>