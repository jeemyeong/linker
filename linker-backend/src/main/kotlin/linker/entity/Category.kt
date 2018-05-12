package linker.entity

import javax.persistence.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:39 PM
 */

@Entity
@Table(name = "categories")
data class Category(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0,
        @field:Column(nullable = false)
        val title: String,
        @field:ManyToOne(targetEntity = User::class, fetch = FetchType.LAZY)
        @field:JoinColumn(name = "user_id")
        val user: User,
        @field:Column(name = "`order`")
        var order: Int
)
