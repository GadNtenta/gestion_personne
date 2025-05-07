// /**
//  * Gestionnaire pour les boutons like
//  * Initialise les écouteurs d'événements pour tous les boutons like
//  */
// export function initLikeButtons() {
//     document.addEventListener("DOMContentLoaded", () => {
//       const likeButtons = document.querySelectorAll(".like-btn")
  
//       likeButtons.forEach((btn) => {
//         btn.addEventListener("click", handleLikeClick)
//       })
//     })
//   }
  
//   /**
//    * Gère le clic sur un bouton like
//    * @param {Event} event - L'événement de clic
//    */
//   function handleLikeClick(event) {
//     const btn = event.currentTarget
//     const img = btn.querySelector("img")
//     const countElement = btn.querySelector(".like-count")
//     const isLiked = btn.dataset.liked === "true"
//     const id = btn.dataset.id
  
//     // Mettre à jour l'état visuel
//     if (!isLiked) {
//       img.src = "/public/Like-filled.svg"
//       btn.classList.remove("text-gray-500")
//       btn.classList.add("text-red-500")
//       if (countElement) {
//         countElement.textContent = (Number.parseInt(countElement.textContent) + 1).toString()
//       }
//       btn.dataset.liked = "true"
//     } else {
//       img.src = "/public/Like.svg"
//       btn.classList.remove("text-red-500")
//       btn.classList.add("text-gray-500")
//       if (countElement) {
//         countElement.textContent = (Number.parseInt(countElement.textContent) - 1).toString()
//       }
//       btn.dataset.liked = "false"
//     }
  
//     // Vous pouvez ajouter ici une requête AJAX pour mettre à jour le like en base de données
//     // Par exemple:
//     // updateLikeStatus(id, !isLiked);
//   }
  
//   /**
//    * Fonction pour mettre à jour le statut du like en base de données
//    * @param {string} id - L'identifiant de l'élément liké
//    * @param {boolean} liked - Le nouvel état du like
//    */
//   async function updateLikeStatus(id, liked) {
//     try {
//       const response = await fetch("/api/likes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
//         },
//         body: JSON.stringify({ id, liked }),
//       })
  
//       if (!response.ok) {
//         throw new Error("Erreur lors de la mise à jour du like")
//       }
  
//       // Traitement de la réponse si nécessaire
//       const data = await response.json()
//       console.log("Like mis à jour avec succès:", data)
//     } catch (error) {
//       console.error("Erreur:", error)
//     }
//   }
  
  