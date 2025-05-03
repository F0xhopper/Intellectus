"use client";
import React from "react";
import { notFound } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";

// Sample book data - in a real app, this would come from a database or API
const books = [
  {
    slug: "summa-theologica-part1-q1",
    title: "Summa Theologica, Part I, Question 1",
    description: "Whether sacred doctrine is a science?",
    content: `
      <h2>Whether sacred doctrine is a science?</h2>

      <p>
        <strong>Objection 1:</strong> It seems that sacred doctrine is not
        a science. For every science proceeds from self-evident
        principles. But sacred doctrine proceeds from articles of faith
        which are not self-evident, since their truth is not admitted by
        all: "For all men have not faith" (2 Thess. 3:2). Therefore sacred
        doctrine is not a science.S
      </p>

      <p>
        <strong>Objection 2:</strong> Further, no science deals with
        individual facts. But this sacred science treats of individual
        facts, such as the deeds of Abraham, Isaac and Jacob and such
        like. Therefore sacred doctrine is not a science.
      </p>

      <p>
        <strong>On the contrary,</strong> Augustine says (De Trin. xiv, 1)
        "to this science alone belongs that whereby saving faith is
        begotten, nourished, protected and strengthened." But this can be
        said of no science except sacred doctrine. Therefore sacred
        doctrine is a science.
      </p>

      <p>
        <strong>I answer that,</strong> Sacred doctrine is a science. We
        must bear in mind that there are two kinds of sciences. There are
        some which proceed from a principle known by the natural light of
        intelligence, such as arithmetic and geometry and the like. There
        are some which proceed from principles known by the light of a
        higher science: thus the science of perspective proceeds from
        principles established by geometry, and music from principles
        established by arithmetic. So it is that sacred doctrine is a
        science because it proceeds from principles established by the
        light of a higher science, namely, the science of God and the
        blessed. Hence, just as the musician accepts on authority the
        principles taught him by the mathematician, so sacred science is
        established on principles revealed by God.
      </p>

      <p>
        <strong>Reply to Objection 1:</strong> The principles of any
        science are either in themselves self-evident, or reducible to the
        conclusions of a higher science; and such, as we have said, are
        the principles of sacred doctrine.
      </p>

      <p>
        <strong>Reply to Objection 2:</strong> Individual facts are
        treated of in sacred doctrine, not because it is concerned with
        them principally, but they are introduced rather both as examples
        to be followed in our lives (as in moral sciences) and in order to
        establish the authority of those men through whom the divine
        revelation, on which this sacred scripture or doctrine is based,
        has come down to us.
      </p>

      <hr />

      <h2>Whether sacred doctrine is one science?</h2>

      <p>
        <strong>Objection 1:</strong> It seems that sacred doctrine is not
        one science; for according to the Philosopher (Poster. i) "that
        science is one which treats only of one class of subjects." But
        the creator and the creature, both of whom are treated of in
        sacred doctrine, cannot be grouped together under one class of
        subjects. Therefore sacred doctrine is not one science.
      </p>

      <p>
        <strong>Objection 2:</strong> Further, in sacred doctrine we treat
        of angels, corporeal creatures and human morality. But these
        belong to separate philosophical sciences. Therefore sacred
        doctrine cannot be one science.
      </p>

      <p>
        <strong>On the contrary,</strong> Holy Scripture speaks of it as
        one science: "Wisdom gave him the knowledge [scientiam] of holy
        things" (Wis. 10:10).
      </p>

      <p>
        <strong>I answer that,</strong> Sacred doctrine is one science.
        The unity of a faculty or habit is to be gauged by its object, not
        indeed, in its material aspect, but as regards the precise
        formality under which it is an object. For example, man, ass,
        stone agree in the one precise formality of being colored; and
        color is the formal object of sight. Therefore, because Sacred
        Scripture considers things precisely under the formality of being
        divinely revealed, whatever has been divinely revealed possesses
        the one precise formality of the object of this science; and
        therefore is included under sacred doctrine as under one science.
      </p>

      <p>
        <strong>Reply to Objection 1:</strong> Sacred doctrine does not
        treat of God and creatures equally, but of God primarily, and of
        creatures only so far as they are referable to God as their
        beginning or end. Hence the unity of this science is not impaired.
      </p>

      <p>
        <strong>Reply to Objection 2:</strong> Nothing prevents inferior
        faculties or habits from being differentiated by something which
        falls under a higher faculty or habit as well; because the higher
        faculty or habit regards the object in its more universal
        formality, as the object of the "common sense" is whatever affects
        the senses, including, therefore, whatever is visible or audible.
        Hence the "common sense," although one faculty, extends to all the
        objects of the five senses. Similarly, objects which are the
        subject-matter of different philosophical sciences can yet be
        treated of by this one single sacred science under one aspect
        precisely so far as they can be included in revelation. So that in
        this way, sacred doctrine bears, as it were, the stamp of the
        divine science which is one and simple, yet extends to everything.
      </p>

      <hr />

      <h2>Whether sacred doctrine is a practical science?</h2>

      <p>
        <strong>Objection 1:</strong> It seems that sacred doctrine is a
        practical science; for a practical science is that which ends in
        action according to the Philosopher (Metaph. ii). But sacred
        doctrine is ordained to action: "Be ye doers of the word, and not
        hearers only" (James 1:22). Therefore sacred doctrine is a
        practical science.
      </p>

      <p>
        <strong>Objection 2:</strong> Further, sacred doctrine is divided
        into the Old and the New Law. But law implies a moral science
        which is a practical science. Therefore sacred doctrine is a
        practical science.
      </p>

      <p>
        <strong>On the contrary,</strong> Every practical science is
        concerned with human operations; as moral science is concerned
        with human acts, and architecture with buildings. But sacred
        doctrine is chiefly concerned with God, whose handiwork is
        especially man. Therefore it is not a practical but a speculative
        science.
      </p>

      <p>
        <strong>I answer that,</strong> Sacred doctrine, being one,
        extends to things which belong to different philosophical sciences
        because it considers in each the same formal aspect, namely, so
        far as they can be known through divine revelation. Hence,
        although among the philosophical sciences one is speculative and
        another practical, nevertheless sacred doctrine includes both; as
        God, by one and the same science, knows both Himself and His
        works. Still, it is speculative rather than practical because it
        is more concerned with divine things than with human acts; though
        it does treat even of these latter, inasmuch as man is ordained by
        them to the perfect knowledge of God in which consists eternal
        bliss. This is a sufficient answer to the Objections.
      </p>

      <hr />

      <h2>Whether sacred doctrine is nobler than other sciences?</h2>

      <p>
        <strong>Objection 1:</strong> It seems that sacred doctrine is not
        nobler than other sciences; for the nobility of a science depends
        on the certitude it establishes. But other sciences, the
        principles of which cannot be doubted, seem to be more certain
        than sacred doctrine; for its principles---namely, articles of
        faith---can be doubted. Therefore other sciences seem to be
        nobler.
      </p>

      <p>
        <strong>Objection 2:</strong> Further, it is the sign of a lower
        science to depend upon a higher; as music depends on arithmetic.
        But sacred doctrine does in a sense depend upon philosophical
        sciences; for Jerome observes, in his Epistle to Magnus, that "the
        ancient doctors so enriched their books with the ideas and phrases
        of the philosophers, that thou knowest not what more to admire in
        them, their profane erudition or their scriptural learning."
        Therefore sacred doctrine is inferior to other sciences.
      </p>

      <p>
        <strong>On the contrary,</strong> Other sciences are called the
        handmaidens of this one: "Wisdom sent her maids to invite to the
        tower" (Prov. 9:3).
      </p>

      <p>
        <strong>I answer that,</strong> Since this science is partly
        speculative and partly practical, it transcends all others
        speculative and practical. Now one speculative science is said to
        be nobler than another, either by reason of its greater certitude,
        or by reason of the higher worth of its subject-matter. In both
        these respects this science surpasses other speculative sciences;
        in point of greater certitude, because other sciences derive their
        certitude from the natural light of human reason, which can err;
        whereas this derives its certitude from the light of divine
        knowledge, which cannot be misled: in point of the higher worth of
        its subject-matter because this science treats chiefly of those
        things which by their sublimity transcend human reason; while
        other sciences consider only those things which are within
        reason's grasp. Of the practical sciences, that one is nobler
        which is ordained to a further purpose, as political science is
        nobler than military science; for the good of the army is directed
        to the good of the State. But the purpose of this science, in so
        far as it is practical, is eternal bliss; to which as to an
        ultimate end the purposes of every practical science are directed.
        Hence it is clear that from every standpoint, it is nobler than
        other sciences.
      </p>

      <p>
        <strong>Reply to Objection 1:</strong> It may well happen that
        what is in itself the more certain may seem to us the less certain
        on account of the weakness of our intelligence, "which is dazzled
        by the clearest objects of nature; as the owl is dazzled by the
        light of the sun" (Metaph. ii, lect. i). Hence the fact that some
        happen to doubt about articles of faith is not due to the
        uncertain nature of the truths, but to the weakness of human
        intelligence; yet the slenderest knowledge that may be obtained of
        the highest things is more desirable than the most certain
        knowledge obtained of lesser things, as is said in de Animalibus
        xi.
      </p>

      <p>
        <strong>Reply to Objection 2:</strong> This science can in a sense
        depend upon the philosophical sciences, not as though it stood in
        need of them, but only in order to make its teaching clearer. For
        it accepts its principles not from other sciences, but immediately
        from God, by revelation. Therefore it does not depend upon other
        sciences as upon the higher, but makes use of them as of the
        lesser, and as handmaidens: even so the master sciences make use
        of the sciences that supply their materials, as political of
        military science. That it thus uses them is not due to its own
        defect or insufficiency, but to the defect of our intelligence,
        which is more easily led by what is known through natural reason
        (from which proceed the other sciences) to that which is above
        reason, such as are the teachings of this science.
      </p>
    `,
  },
  // Add more books as needed
];

export default function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Unwrap params using React.use()
  const { slug } = React.use(params);

  // Find the book with the matching slug
  const book = books.find((book) => book.slug === slug);

  // If book not found, return 404
  if (!book) {
    notFound();
  }

  return (
    <main className="flex min-h-screen bg-background">
      <div className="flex flex-col w-full h-full p-5">
        <div className="space-y-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{book.title}</h1>
            <p className="text-muted-foreground mt-2">{book.description}</p>
          </div>

          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: book.content }}
          />
        </div>
      </div>
    </main>
  );
}
