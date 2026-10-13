import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request, { params }) {
  try {
    const { id: quizId } = params;
    const { userId = 'user_alex_morgan', userAnswers } = await request.json();

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    let correctCount = 0;
    const totalQuestions = quiz.questions.length;
    const questionResults = quiz.questions.map((q, idx) => {
      const userAnswerIndex = userAnswers[q.id] !== undefined ? userAnswers[q.id] : userAnswers[idx];
      const isCorrect = userAnswerIndex === q.correctAnswerIndex;
      if (isCorrect) correctCount++;

      return {
        questionId: q.id,
        question: q.question,
        userAnswerIndex,
        correctAnswerIndex: q.correctAnswerIndex,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const passed = percentage >= quiz.passingScore;

    // Save attempt
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId,
        quizId,
        score: correctCount,
        maxScore: totalQuestions,
        percentage,
        passed,
      },
    });

    // Reward XP if passed
    let xpEarned = 0;
    if (passed) {
      xpEarned = 50;
      await prisma.user.update({
        where: { id: userId },
        data: {
          xp: { increment: xpEarned },
        },
      });
    }

    return NextResponse.json({
      success: true,
      attempt,
      correctCount,
      totalQuestions,
      percentage,
      passed,
      xpEarned,
      results: questionResults,
    });
  } catch (error) {
    console.error('Quiz grading error:', error);
    return NextResponse.json({ error: 'Failed to grade quiz' }, { status: 500 });
  }
}
